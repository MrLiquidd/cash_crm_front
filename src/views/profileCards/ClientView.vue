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
                  <p>
                    {{ client.first_name }} {{ client.surname }}
                    {{ client.last_name }}
                  </p>
                </div>
              </v-flex>
            </v-flex>
            <v-flex xs6 sm4 md3>
              <v-btn variant="text" @click="openEditClientDialog">
                <v-icon
                  icon="mdi-pencil-box-multiple-outline"
                  color="grey"
                  size="large"
                ></v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-end>
            <v-spacer></v-spacer>
            <v-flex xs6 sm4 md2 class="text-right">
              <v-btn
                variant="text"
                size="small"
                style="color: #e53935"
                dark
                @click="openEditClientDialog"
              >
                Удалить клиента
              </v-btn>
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
                <p>{{ client.office }}</p>
              </v-col>
              <v-col cols="12" class="user-info">
                <p>Email:</p>
                <p>{{ client.email }}</p>
              </v-col>
              <v-col cols="12" class="user-info2 relatve border rounded-lg">
                <p>Телефон:</p>
                <p>{{ client.phone }}</p>
              </v-col>
              <v-col cols="12" class="user-info">
                <p>Гражданство:</p>
                <p>РФ</p>
              </v-col>
            </v-row>
          </v-layout>
        </v-card>
      </v-col>
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
      <v-spacer></v-spacer>
      <v-btn
        @click="openAddEventDialog()"
        size="small"
        color="deep-purple-lighten-1"
        text="Создать"
        variant="flat"
      >
        <v-icon
          icon="mdi-plus-circle-outline"
          color="white"
          size="x-large"
        ></v-icon>
        <p style="margin-left: 5px">Создать</p>
      </v-btn>
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
        <div class="description">{{ item.description }}</div>
        <div v-if="item.comments">
          <div v-for="(comment, index) in item.comments" :key="index">
            <div class="comment">Комментарий к событию</div>
            <div class="user-comment">{{ item.comments_main[index] }}</div>
            <div>{{ comment }}</div>
            <v-divider></v-divider>
          </div>
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
        <v-icon class="me-2" size="large" @click="openEditDialog(item)">
          mdi-square-edit-outline
        </v-icon>
        <v-icon class="me-2" size="large" @click="openCommentDialog(item)">
          mdi-comment-text-multiple-outline
        </v-icon>
        <v-icon class="me-2" size="large" @click="openDeleteEventDialog(item)">
          mdi-delete-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true"> </v-alert>
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
        <div class="description">{{ item.description }}</div>
        <div v-if="item.comments">
          <div v-for="(comment, index) in item.comments" :key="index">
            <div class="comment">Комментарий к событию</div>
            <div class="user-comment">{{ item.comments_main[index] }}</div>
            <div>{{ comment }}</div>
            <v-divider></v-divider>
          </div>
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
        <v-icon class="me-2" size="large" @click="openEditDialog(item)">
          mdi-square-edit-outline
        </v-icon>
        <v-icon class="me-2" size="large" @click="openCommentDialog(item)">
          mdi-comment-text-multiple-outline
        </v-icon>
        <v-icon class="me-2" size="large" @click="openDeleteEventDialog(item)">
          mdi-delete-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true"> </v-alert>
      </template>
    </v-data-table>
  </v-card>

  <!-- Edit Event Dialog -->
  <v-dialog v-model="edit_dialog" max-width="500">
    <v-card max-width="500" title="Добавить событие">
      <v-layout>
        <v-main>
          <v-container class="pt-8">
            <v-autocomplete
              v-model="form.event_type"
              :items="events"
              :readonly="loading"
              :rules="[required]"
              label="Тип события"
              variant="outlined"
              density="compact"
              required
              auto-select-first
            ></v-autocomplete>
            <v-text-field
              v-model="form.data"
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
              label="Выберите дату и время"
              variant="outlined"
              density="compact"
            />

            <v-autocomplete
              v-model="form.status"
              :items="status"
              :readonly="loading"
              :rules="[required]"
              label="Статус"
              variant="outlined"
              density="compact"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="form.reflective"
              density="compact"
              :items="users"
              item-title="full_name"
              item-value="id"
              :readonly="loading"
              :rules="[required]"
              label="Ответственный"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="form.office"
              density="compact"
              :items="office"
              item-title="office"
              item-value="id"
              :readonly="loading"
              :rules="[required]"
              label="Офис"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="form.creator"
              item-disabled="disable"
              label="Создатель события"
              density="compact"
              variant="outlined"
              disabled
            ></v-autocomplete>

            <v-autocomplete
              v-model="client"
              item-title="name"
              item-value="id"
              :readonly="loading"
              label="Клиент"
              variant="outlined"
              density="compact"
              required
              auto-select-first
              disabled
            ></v-autocomplete>

            <v-textarea
              v-model="form.comment"
              label="Комментарий"
              maxlength="120"
              density="compact"
              variant="outlined"
              counter
              single-line
            ></v-textarea>
          </v-container>
        </v-main>
      </v-layout>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close"
          variant="plain"
          @click="edit_dialog = false"
        ></v-btn>

        <v-btn text="Save" variant="tonal" @click="save()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Add Comment -->
  <v-dialog v-model="comment_dialog" max-width="500">
    <v-card max-width="500" title="Добавить комментарий">
      <v-layout>
        <v-main>
          <v-container class="pt-8">
            <v-textarea
              v-model="comment_form.comment"
              label="Ваш комментарий"
              maxlength="120"
              density="compact"
              variant="outlined"
              counter
              single-line
            ></v-textarea>
          </v-container>
        </v-main>
      </v-layout>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close"
          variant="plain"
          @click="comment_dialog = false"
        ></v-btn>

        <v-btn text="Save" variant="tonal" @click="save_comment()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Delete Event -->
  <v-dialog v-model="delete_event_dialog" max-width="500">
    <v-card max-width="500" title="Удалить запись">
      <v-card-title>Вы уверены</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Закрыть"
          variant="plain"
          @click="delete_event_dialog = false"
        ></v-btn>

        <v-btn
          color="red-darken-1"
          text="Удалить"
          variant="tonal"
          @click="delete_event()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Delete Client -->
  <v-dialog v-model="delete_client_dialog" max-width="500">
    <v-card max-width="500" title="Удалить клиента">
      <v-card-text>
        <h3>Вы уверены?</h3>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Отмена"
          variant="plain"
          @click="delete_client_dialog = false"
        ></v-btn>

        <v-btn
          color="red-darken-1"
          text="Удалить"
          variant="tonal"
          @click="delete_client()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Edit Client -->
  <v-dialog v-model="edit_client_dialog" max-width="500">
    <v-card prepend-icon="mdi-account" title="Добавить клиента">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="client.office"
              density="compact"
              :items="office"
              item-title="office"
              item-value="id"
              :readonly="loading"
              :rules="[required]"
              label="Офис"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="client.manager"
              density="compact"
              :items="users"
              item-title="full_name"
              item-value="id"
              :readonly="loading"
              :rules="[required]"
              label="Ответственный"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              density="compact"
              v-model="client.first_name"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Имя"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              density="compact"
              v-model="client.surname"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Фамилия"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              density="compact"
              v-model="client.last_name"
              :readonly="loading"
              class="mb-2"
              label="Отчество"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              density="compact"
              v-model="client.phone"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Телефон"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              density="compact"
              v-model="client.email"
              :rules="[required]"
              class="mb-2"
              label="Email"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
              density="compact"
              v-model="client.gender"
              :rules="[required]"
              class="mb-2"
              :items="['М', 'Ж']"
              label="Пол"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-textarea
              v-model="client.comment"
              label="Комментарий"
              maxlength="120"
              density="compact"
              variant="outlined"
              counter
              single-line
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn text="Save" variant="tonal" @click="editClient()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Add Client Event -->
  <v-dialog v-model="add_event_dialog" width="500">
    <v-card max-width="500" title="Добавить событие">
      <v-layout>
        <v-main>
          <v-container class="pt-8">
            <v-autocomplete
              v-model="event_form.event_type"
              :items="events"
              :readonly="loading"
              :rules="[required]"
              label="Тип события"
              variant="outlined"
              density="compact"
              required
              auto-select-first
            ></v-autocomplete>
            <div
              v-if="
                event_form.event_type == 'Открытие счета' ||
                event_form.event_type == 'Пополнение счета'
              "
            >
              <v-text-field
                density="compact"
                v-model="event_form.in_usd"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Сумма в USD"
                variant="outlined"
              ></v-text-field>
            </div>
            <v-text-field
              v-model="event_form.data"
              type="datetime-local"
              id="meeting-time"
              name="meeting-time"
              label="Выберите дату и время"
              variant="outlined"
              density="compact"
            />
            <v-autocomplete
              v-model="event_form.status"
              :items="status"
              :readonly="loading"
              :rules="[required]"
              label="Статус"
              variant="outlined"
              density="compact"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="event_form.reflective"
              density="compact"
              :items="users"
              item-title="full_name"
              item-value="id"
              :readonly="loading"
              :rules="[required]"
              label="Ответственный"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="event_form.office"
              density="compact"
              :items="office"
              item-title="office"
              item-value="id"
              :readonly="loading"
              :rules="[required]"
              label="Офис"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="event_form.creator"
              item-disabled="disable"
              label="Создатель события"
              density="compact"
              variant="outlined"
              disabled
            ></v-autocomplete>

            <v-autocomplete
              v-model="client.name"
              item-title="name"
              item-value="id"
              :readonly="loading"
              label="Клиент"
              variant="outlined"
              density="compact"
              required
              auto-select-first
              disabled
            ></v-autocomplete>

            <v-textarea
              v-model="event_form.description"
              label="Описание"
              maxlength="120"
              density="compact"
              variant="outlined"
              counter
              single-line
            ></v-textarea>
          </v-container>
        </v-main>
      </v-layout>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Закрыть"
          variant="plain"
          @click="add_event_dialog = false"
        ></v-btn>

        <v-btn text="Save" variant="tonal" @click="save_event()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/store/user";

export default {
  name: "client-card",
  data() {
    return {
      add_event_dialog: false,
      edit_dialog: false,
      comment_dialog: false,
      delete_event_dialog: false,
      delete_client_dialog: false,
      edit_client_dialog: false,

      id: this.$route.params.id,
      client: {},
      manager_info: {},
      active_events: [],
      inactive_events: [],
      event: "",
      users: [],
      office: [],
      status: ["Запланировано", "Обработано", "Выполнено", "Просрочено"],
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

      events: [
        "Регистрация",
        "Звонок",
        "Констультация",
        "Лекция",
        "Практика",
        "Стажировка",
        "Конец стажировки",
        "Мастер класс",
        "Вопрос о счете",
        "Школа трейдера",
        "Последняя практика",
        "Открытие счета",
        "Пополнение счета",
        "Встреча",
      ],
      comment_form: {
        event: 0,
        comment: "",
      },
      event_form: {
        reflective: "",
        event_type: "",
        data: "",
        comment: "",
        status: "",
      },
      form: {
        id: "",
        reflective: "",
        event_type: "",
        data: "",
        status: "",
        comment: "",
        in_usd: "",
        responsible: "",
        client: "",
      },
    };
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
    },
  },
  mounted() {
    const userId = this.$route.params.id;
    this.fetchClientData(userId);
    this.fetchActiveEvents(userId);
    this.fetchInActiveEvents(userId);
    this.getOffice();
  },
  methods: {
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
          return "#7270FF";
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
    openEditDialog(item) {
      this.form = item;
      const specificDateTime = new Date(this.form.data);
      this.form.data = specificDateTime.toISOString().slice(0, 16);
      this.getUsers();
      this.edit_dialog = true;
    },
    openEditClientDialog() {
      this.getUsers();
      this.edit_client_dialog = true;
    },
    openCommentDialog(event) {
      this.comment_form.event = event.id;
      this.comment_form.comment = "";
      this.comment_dialog = true;
    },
    openDeleteEventDialog(event) {
      this.event = event;
      this.delete_event_dialog = true;
    },
    openDeleteClientDialog() {
      this.delete_client_dialog = true;
    },
    openAddEventDialog() {
      const userStore = useUserStore();
      userStore.initStore();
      this.add_event_dialog = true;
      this.getUsers();
      this.event_form.creator = userStore.user.full_name;
      this.event_form.reflective = userStore.user.id;
    },

    async delete_event() {
      try {
        axios
          .delete(`/api/events/${this.event.id}/`)
          .then((response) => {
            console.log("Event deleted successfully:", response.data);
            this.delete_event_dialog = false;
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      } catch (e) {
        console.error("Error deleting event:", e);
      }
    },
    async delete_client() {
      try {
        axios
          .delete(`/api/leads/${this.client.id}/`)
          .then((response) => {
            console.log("Event deleted successfully:", response.data);
            this.delete_event_dialog = false;
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      } catch (e) {
        console.error("Error deleting event:", e);
      }
    },
    async editClient() {
      try {
        axios
          .put(`/api/leads/${this.client.id}/`, this.client)
          .then((response) => {
            console.log("Client added successfully:", response.data);
            this.edit_client_dialog = false;
          })
          .catch((error) => {
            console.error("Error adding client:", error);
          });
      } catch (e) {
        console.error("Error adding client:", e);
      }
    },
    async save_event() {
      const userStore = useUserStore();
      this.event_form.creator = userStore.user.id;
      this.event_form.client = this.client.id;
      console.log(this.event_form);
      try {
        axios
          .post("/api/events/", this.event_form)
          .then((response) => {
            console.log("Event added successfully:", response.data);
            this.add_event_dialog = false;
          })
          .catch((error) => {
            console.error("Error adding client:", error);
          });
      } catch (e) {
        console.error("Error adding client:", e);
      }
    },
    async save() {
      try {
        axios
          .put(`/api/events/${this.form.id}/`, this.form)
          .then((response) => {
            console.log("Client added successfully:", response.data);
            this.edit_dialog = false;
          })
          .catch((error) => {
            console.error("Error adding client:", error);
          });
      } catch (e) {
        console.error("Error adding client:", e);
      }
    },

    async save_comment() {
      try {
        axios
          .post(`/api/event-comments/`, this.comment_form)
          .then((response) => {
            console.log("Comment added successfully:", response.data);
            this.comment_dialog = false;
          })
          .catch((error) => {
            console.error("Error adding comment:", error);
          });
      } catch (e) {
        console.error("Error adding comment:", e);
      }
    },
    async getUsers() {
      axios
        .get("/api/accounts/")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchClientData(client_id) {
      axios
        .get(`/api/leads/${client_id}/`)
        .then((response) => {
          this.client = response.data;
          this.client.office = this.client.office.office;
          this.manager_info = response.data.manager;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.error = "Failed to fetch user data";
          this.loading = false;
        });
    },
    async fetchActiveEvents(client_id) {
      axios
        .get(`api/events/client/active/${client_id}/`)
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
    async fetchInActiveEvents(client_id) {
      axios
        .get(`api/events/client/unactive/${client_id}/`)
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
    async getOffice() {
      axios
        .get("/api/office/")
        .then((response) => {
          this.office = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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
  font-size: 14px; /* Увеличение шрифта для описания */
}
.user-comment {
  font-size: 14px;
  font-weight: 600;
  color: #ffc700;
}

.comment {
  font-size: 14px;
  font-weight: 600;
  color: #52dd16; /* Цвет текста для комментария */
}
</style>
