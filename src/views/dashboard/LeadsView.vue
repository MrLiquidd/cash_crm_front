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
      <p>Клиенты</p>
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
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <a :href="getClientUrl(item.id)" class="user-link">
          {{ item.name }}
        </a>
      </template>
      <template v-slot:[`item.manager.full_name`]="{ item }">
        <a :href="getUserUrl(item.manager.id)" class="user-link">
          {{ item.manager.full_name }}
        </a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "leads-view",
  data() {
    return {
      page: 1,
      total: 0,
      loading: true,
      itemsPerPage: 30,
      rows: [],
      search: "",
      colums: [
        {
          align: "start",
          key: "id",
          sortable: true,
          title: "#",
        },
        {
          align: "start",
          key: "name",
          sortable: true,
          title: "Клиент",
        },
        {
          align: "start",
          key: "phone",
          sortable: true,
          title: "Телефон",
        },
        {
          align: "start",
          key: "email",
          sortable: true,
          title: "E-mail",
        },
        {
          align: "start",
          key: "office",
          sortable: true,
          title: "Офис",
        },
        {
          align: "start",
          key: "manager.full_name",
          sortable: true,
          title: "Менеджер",
        },
      ],
    };
  },
  components: {},
  mounted() {
    this.getLeads();
  },
  methods: {
    async getLeads() {
      axios
        .get("/api/leads/")
        .then((response) => {
          this.rows = response.data;
          this.loading = false;
          this.total = this.rows.length;
        })
        .catch((error) => {
          console.log(error);
        });
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
.user-link {
  color: inherit;
  text-decoration: underline;
}
.user-link:hover {
  text-decoration: none;
}
</style>
