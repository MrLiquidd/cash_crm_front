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
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "client-transfers-view",
  data() {
    return {
      page: 1,
      total: 0,
      loading: true,
      itemsPerPage: 30,
      rows: [],
      search: "",
      colums: [],
    };
  },
  components: {},
  mounted() {},
  methods: {},
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
