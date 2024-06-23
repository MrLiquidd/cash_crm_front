<template>
  <v-card class="relative border rounded-lg elevation-10 mt-16" elevated>
    <v-card-title class="d-flex align-center pe-2">
      <v-text-field
        v-model="search"
        density="compact"
        label="Поиск"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
      <v-spacer></v-spacer>
      <p>События</p>
      &nbsp; &nbsp; &nbsp;
      <p>Показано: {{ rows.length }}</p>
      &nbsp;
      <p>/</p>
      &nbsp;
      <p>Всего: {{ total }}</p>
    </v-card-title>

    <v-data-table
      :headers="colums"
      :items="rows"
      :search="search"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:[`item.description`]="{ item }">
        <div>
          <div class="description">{{ item.description }}</div>
          <div class="comment">Комментарий к событию</div>
          <div>{{ item.comment }}</div>
        </div>
      </template>
      <template v-slot:[`item.client.full_name`]="{ item }">
        <a :href="getClientUrl(item.client.id)" class="user-link">
          {{ item.client.full_name }}
        </a>
      </template>
      <template v-slot:[`item.event_type`]="{ item }">
        <div>
          <span :class="getEventColor(item.status)" class="color-dot"></span>
          {{ item.event_type }}
        </div>
      </template>
      <template v-slot:[`item.status`]="{ value }">
        <v-chip :color="getStatusColor(value)"> {{ value }}</v-chip>
      </template>
      <template v-slot:[`item.data`]="{ item }">
        {{ formatDate(item.data) }}
      </template>
      <template v-slot:[`item.modified_at`]="{ item }">
        {{ formatDate(item.modified_at) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "event-view",
  data() {
    return {
      search: "",
      page: 1,
      total: 0,
      loading: true,
      itemsPerPage: 30,
      rows: [],
      colums: [
        {
          align: "start",
          key: "id",
          sortable: true,
          title: "#",
        },
        {
          align: "start",
          key: "event_type",
          sortable: true,
          title: "Тип события",
        },
        {
          align: "start",
          key: "client.full_name",
          sortable: true,
          title: "Клиент",
        },
        {
          align: "start",
          key: "description",
          sortable: true,
          title: "Описание",
        },
        {
          align: "start",
          key: "data",
          sortable: true,
          title: "Дедлайн",
        },
        {
          align: "start",
          key: "client.office",
          sortable: true,
          title: "Офис",
        },
        {
          align: "start",
          key: "status",
          sortable: true,
          title: "Статус",
        },
        {
          align: "start",
          key: "modified_at",
          sortable: true,
          title: "Обновлено",
        },
      ],
    };
  },
  mounted() {
    this.getLeads();
  },
  methods: {
    async getLeads() {
      axios
        .get("/api/events/")
        .then((response) => {
          this.rows = response.data;
          console.log(this.rows);
          this.loading = false;
          this.total = this.rows.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStatusColor(status) {
      // Функция для определения класса в зависимости от статуса
      switch (status) {
        case "Запланировано":
          return "yellow lighten-3"; // Пример класса для активного статуса
        case "Обработано":
          return "yellow lighten-3";
        case "Выполнено":
          return "green lighten-3";
        case "Просрочено":
          return "red lighten-3";
        default:
          return ""; // По умолчанию никакой дополнительный класс
      }
    },
    getEventColor(status) {
      switch (status) {
        case "Выполнено":
          return "bg-success";
        case "Запланировано":
          return "bg-yellow";
        case "Обработано":
          return "bg-yellow";
        case "Просрочено":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
    },
    formatDate(dateString) {
      console.log(dateString);
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
    getClientUrl(userId) {
      return `/client/${userId}`;
    },
    getUserUrl(userId) {
      return `/user/${userId}`;
    },
  },
};
</script>

<style>
.color-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

.bg-success {
  background-color: green;
}

.bg-yellow {
  background-color: yellow;
}

.bg-danger {
  background-color: red;
}

.user-link {
  color: inherit;
  text-decoration: none;
}
.user-link:hover {
  text-decoration: underline;
}
</style>
