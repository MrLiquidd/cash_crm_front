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
            <div
              v-if="
                form.event_type == 'Открытие счета' ||
                form.event_type == 'Пополнение счета'
              "
            >
              <v-text-field
                density="compact"
                v-model="form.in_usd"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Сумма в USD"
                variant="outlined"
              ></v-text-field>
            </div>
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
              v-model="form.description"
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
    is_staff: false,
    form: {
      reflective: "",
      event_type: "",
      office: "",
      status: "",
      description: "",
      in_usd: "",
      client: "",
      creator: "",
    },
    user: "",
    clients: [],
    users: [],
    office: [],
    loading: false,
  }),
  mounted() {
    const userStore = useUserStore();
    this.is_staff = userStore.user.is_staff;
    this.form.creator = userStore.user.full_name;
    this.getLeads();
    this.getUsers();
    this.getOffice();
  },
  computed: {
    filteredItems() {
      const userStore = useUserStore();
      return this.is_staff ? this.users : userStore.user.full_name;
    },
  },
  methods: {
    required(v) {
      return !!v || "Поле обязательно!";
    },
    async save() {
      const userStore = useUserStore();
      this.is_staff = userStore.user.is_staff;
      this.form.creator = userStore.user.id;
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
        })
        .catch((error) => {
          console.log(error);
        });
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
