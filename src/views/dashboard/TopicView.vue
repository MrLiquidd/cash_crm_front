<template>
  <v-container class="mt-6" fluid>
    <v-toolbar class="mt-6" app fixed>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="1200">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            size="small"
            color="deep-purple-lighten-1"
            text="Создать топик"
            variant="flat"
          ></v-btn>
        </template>
        <AddTopicCard />
      </v-dialog>
    </v-toolbar>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="2">
        <v-card class="relative border rounded-lg elevation-10 col-height">
          <v-card-title class="d-flex align-center pe-2">
            <p>Категории</p>
            <v-btn variant="text">
              <v-icon icon="mdi-plus" color="white" size="x-large"></v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card class="relative border rounded-lg elevation-10" flat>
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
            <template v-slot:[`item.event_type`]="{ item }">
              <div>
                <span
                  :class="getEventColor(item.status)"
                  class="color-dot"
                ></span>
                {{ item.event_type }}
              </div>
            </template>
            <template v-slot:[`item.status`]="{ value }">
              <v-chip :color="getStatusColor(value)"> {{ value }}</v-chip>
            </template>
            <template v-slot:[`item.open_topic`]="{ item }">
              {{ formatDate(item.open_topic) }}
            </template>
            <template v-slot:[`item.deadline`]="{ item }">
              {{ formatDate(item.deadline) }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import AddTopicCard from "@/components/AddTopicCard.vue";

export default {
  name: "topic-view",
  components: {
    AddTopicCard,
  },
  data() {
    return {
      dialog: false,
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
          key: "theme",
          sortable: true,
          title: "Тема",
        },
        {
          align: "start",
          key: "status",
          sortable: true,
          title: "Статус",
        },
        {
          align: "start",
          key: "open_topic",
          sortable: true,
          title: "Открыт",
        },
        {
          align: "start",
          key: "deadline",
          sortable: true,
          title: "Дедлайн",
        },
        {
          align: "start",
          key: "author_full_name",
          sortable: true,
          title: "Автор",
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
        .get("/api/topics/")
        .then((response) => {
          console.log(response.data.AddTopicCard);
          this.rows = response.data;
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
  },
};
</script>

<style>
.col-height {
  height: 300px;
}

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
