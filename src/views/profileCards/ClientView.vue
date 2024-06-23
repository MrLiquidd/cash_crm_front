<template>
  <v-card
    class="relatve border rounded-lg dashboard"
    :elevation="20"
    style="margin-top: 55px"
  >
    <v-row>
      <v-col cols="6">
        <v-card flat class="pa-3">
          <v-layout row wrap style="justify-content: space-between">
            <v-flex
              row
              wrap
              style="justify-content: space-between; display: flex"
            >
              <v-flex xs12 md6>
                <v-avatar
                  color="grey"
                  image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  size="70"
                ></v-avatar>
              </v-flex>
              <v-flex xs6 sm4 md2>
                <div class="row" style="margin-left: 15px">
                  <p>{{ user.name }}</p>
                </div>
              </v-flex>
            </v-flex>
            <v-flex xs6 sm4 md3>
              <v-icon
                icon="mdi-pencil-box-multiple-outline"
                color="grey"
                size="x-small"
              ></v-icon>
            </v-flex>
          </v-layout>
          <v-spacer style="height: 10px"></v-spacer>
          <v-layout>
            <v-row no-gutters>
              <v-col cols="12" class="user-info">
                <p>Менеджер:</p>
                <p>{{ manager_info.full_name }}</p>
              </v-col>
              <v-col cols="12" class="user-info2 relatve border rounded-lg">
                <p>Офис:</p>
                <p>{{ user.office }}</p>
              </v-col>
              <v-col cols="12" class="user-info">
                <p>Email:</p>
                <p>{{ user.email }}</p>
              </v-col>
              <v-col cols="12" class="user-info2 relatve border rounded-lg">
                <p>Телефон:</p>
                <p>{{ user.phone }}</p>
              </v-col>
              <v-col cols="12" class="user-info">
                <p>Гражданство:</p>
                <p>РФ</p>
              </v-col>
            </v-row>
          </v-layout>
        </v-card></v-col
      >
      <v-col cols="6">
        Заметки
        <v-textarea
          density="compact"
          variant="outlined"
          class="custom-textarea"
          counter
          single-line
        ></v-textarea>
      </v-col>
    </v-row>
  </v-card>
  <v-card> История изменений</v-card>
  <v-card
    class="relatve border rounded-lg dashboard"
    :elevation="20"
    style="margin-top: 10px"
  >
    <v-card-title class="d-flex align-center pe-2">
      <p style="color: #52dd16">События на будущее</p>
    </v-card-title>
    <v-data-table
      :headers="colums"
      :items="active_events"
      :search="search"
      :loading="loading"
      hide-default-header
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:[`item.comment`]="{ item }">
        <div>
          <div class="description">{{ item.description }}</div>
          <div class="comment">Комментарий к событию</div>
          <div>{{ item.comment }}</div>
        </div>
      </template>
      <template v-slot:[`item.status`]="{ value }">
        <v-chip :color="getStatusColor(value)"> {{ value }}</v-chip>
      </template>
      <template v-slot:[`item.data`]="{ item }">
        {{ formatDate(item.data) }}
      </template>

      <template v-slot:[`item.reflective`]="{ item }">
        <a :href="getUserUrl(item.reflective.id)" class="user-link">
          {{ item.reflective.full_name }}
        </a>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-square-edit-outline
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-comment-text-multiple-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
  <v-card
    class="relatve border rounded-lg dashboard"
    :elevation="20"
    style="margin-top: 10px"
  >
    <v-card-title class="d-flex align-center pe-2">
      <p style="color: #ffc700">Хронология событий</p>
    </v-card-title>

    <v-data-table
      :headers="colums"
      :items="inactive_events"
      :search="search"
      :loading="loading"
      hide-default-header
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:[`item.comment`]="{ item }">
        <div>
          <div class="description">{{ item.description }}</div>
          <div class="comment">Комментарий к событию</div>
          <div>{{ item.comment }}</div>
        </div>
      </template>
      <template v-slot:[`item.status`]="{ value }">
        <v-chip :color="getStatusColor(value)"> {{ value }}</v-chip>
      </template>
      <template v-slot:[`item.data`]="{ item }">
        {{ formatDate(item.data) }}
      </template>

      <template v-slot:[`item.reflective`]="{ item }">
        <a :href="getUserUrl(item.reflective.id)" class="user-link">
          {{ item.reflective.full_name }}
        </a>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-square-edit-outline
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-comment-text-multiple-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "client-card",
  data() {
    return {
      id: this.$route.params.id,
      user: {},
      manager_info: {},
      active_events: [],
      inactive_events: [],
      colums: [
        {
          align: "start",
          key: "event_type",
          sortable: true,
        },
        {
          align: "start",
          key: "comment",
          sortable: true,
        },
        {
          align: "start",
          key: "reflective",
          sortable: true,
        },
        {
          align: "start",
          key: "data",
          sortable: true,
        },
        {
          align: "start",
          key: "status",
          sortable: true,
        },
        {
          key: "actions",
          sortable: false,
        },
      ],
    };
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
    },
  },
  mounted() {
    const userId = this.$route.params.id;
    this.fetchUserData(userId);
    this.fetchActiveEvents(userId);
    this.fetchInActiveEvents(userId);
  },
  methods: {
    fetchUserData(user_id) {
      axios
        .get(`/api/leads/${user_id}/`)
        .then((response) => {
          this.user = response.data;
          this.manager_info = response.data.manager;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.error = "Failed to fetch user data";
          this.loading = false;
        });
    },
    fetchActiveEvents(user_id) {
      axios
        .get(`api/events/client/active/${user_id}/`)
        .then((response) => {
          this.active_events = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.error = "Failed to fetch user data";
          this.loading = false;
        });
    },
    fetchInActiveEvents(user_id) {
      axios
        .get(`api/events/client/unactive/${user_id}/`)
        .then((response) => {
          this.inactive_events = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.error = "Failed to fetch user data";
          this.loading = false;
        });
    },
    differenceInMonths(dateString) {
      const savedDate = new Date(dateString);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const savedYear = savedDate.getFullYear();
      const savedMonth = savedDate.getMonth();

      return (currentYear - savedYear) * 12 + (currentMonth - savedMonth);
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
    getStatusColor(status) {
      switch (status) {
        case "Запланировано":
          return "yellow lighten-3";
        case "Обработано":
          return "yellow lighten-3";
        case "Выполнено":
          return "green lighten-3";
        case "Просрочено":
          return "red lighten-3";
        default:
          return "";
      }
    },
    getUserUrl(userId) {
      return `/user/${userId}`;
    },
  },
};
</script>

<style>
.custom-textarea {
  background-color: #535357; /* Темно-серый фон */
  color: white; /* Цвет текста, чтобы он был виден на темном фоне */
}
.description {
  font-size: 16px; /* Увеличение шрифта для описания */
}
.comment {
  font-size: 16px;
  color: #52dd16; /* Цвет текста для комментария */
}
</style>
