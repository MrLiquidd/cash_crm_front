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
      <p>Список переходов клиентов по сотрудникам</p>
      &nbsp; &nbsp; &nbsp;
      <p>Показано: {{ rows.length }}</p>
      &nbsp;
      <p>/</p>
      &nbsp;
      <p>Всего: {{ total }}</p>
    </v-card-title>

    <v-data-table :headers="colums" :items="rows" :search="search">
      <template v-slot:[`item.full_name`]="{ item }">
        <a :href="getUserUrl(item.id)" class="user-link">
          {{ item.full_name }}
        </a>
      </template>
      <template v-slot:[`item.hire_data`]="{ item }">
        {{ formatDate(item.hire_data) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      total: 0,
      loading: true,
      itemsPerPage: 30,
      rows: [].map((item, index) => ({ idd: index + 1, ...item })),
      search: "",
      colums: [
        {
          align: "start",
          key: "idd",
          sortable: true,
          title: "#",
        },
        {
          align: "start",
          key: "full_name",
          sortable: true,
          title: "ФИО",
        },
        {
          align: "start",
          key: "job_title",
          sortable: true,
          title: "Должность",
        },
        {
          align: "start",
          key: "office.office",
          sortable: true,
          title: "Офис",
        },
        {
          align: "start",
          key: "phone",
          sortable: true,
          title: "Телефон",
        },
        {
          align: "start",
          key: "hire_data",
          sortable: true,
          title: "Дата найма",
        },
      ],
    };
  },
  components: {},
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      axios
        .get("/api/accounts/")
        .then((response) => {
          this.rows = response.data.map((item, index) => ({
            idd: index + 1,
            ...item,
          }));
          console.log(this.rows);
          this.loading = false;
          this.total = this.rows.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserUrl(userId) {
      return `/user/${userId}`;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
};
</script>
<style>
.user-link {
  color: inherit;
  text-decoration: underline;
}
.user-link:hover {
  text-decoration: none;
}
</style>
