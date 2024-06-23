<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        size="small"
        color="deep-purple-lighten-1"
        text="Событие"
        variant="flat"
      ></v-btn>
    </template>

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
              label="Тип события"
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
              v-model="form.responsible"
              density="compact"
              :items="[userStore.user.full_name]"
              :readonly="loading"
              :rules="[required]"
              label="Ответственный"
              variant="outlined"
              required
              auto-select-first
            ></v-autocomplete>
            <v-autocomplete
              v-model="form.responsible"
              item-disabled="disable"
              label="Создатель события"
              density="compact"
              variant="outlined"
              disabled
            ></v-autocomplete>

            <v-autocomplete
              v-model="form.client"
              :items="clients"
              item-title="name"
              item-value="id"
              :readonly="loading"
              label="Клиент"
              variant="outlined"
              density="compact"
              required
              auto-select-first
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

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn text="Save" variant="tonal" @click="save()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/store/user";
export default {
  setup() {
    const userStore = useUserStore();
    userStore.initStore(); // Инициализируем пользователя и данные клиента из local storage

    return { userStore };
  },

  data: () => ({
    dialog: false,
    status: ["Запланировано", "Обработано", "Выполнено", "Просрочено"],
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

    form: {
      reflective: "",
      event_type: "",
      status: "",
      comment: "",
      in_usd: "",
      responsible: "",
      client: "",
    },
    clients: [],
    loading: false,
  }),
  mounted() {
    this.getLeads();
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    async save() {
      const userStore = useUserStore();
      this.form.reflective = userStore.user.id;
      try {
        axios
          .post("/api/events/", this.form)
          .then((response) => {
            console.log("Client added successfully:", response.data);
            this.dialog = false;
          })
          .catch((error) => {
            console.error("Error adding client:", error);
          });
      } catch (e) {
        console.error("Error adding client:", e);
      }
    },
    async getLeads() {
      axios
        .get("/api/leads/")
        .then((response) => {
          this.clients = response.data;
          console.log(this.clients);
          this.loading = false;
          this.total = this.rows.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
