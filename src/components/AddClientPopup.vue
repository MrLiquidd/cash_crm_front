<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        size="small"
        color="deep-purple-lighten-1"
        text="Клиент"
        variant="flat"
      ></v-btn>
    </template>

    <v-card prepend-icon="mdi-account" title="Добавить клиента">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
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
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              v-model="form.manager"
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
              v-model="form.first_name"
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
              v-model="form.surname"
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
              v-model="form.last_name"
              :readonly="loading"
              class="mb-2"
              label="Отчество"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field
              density="compact"
              v-model="form.phone"
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
              v-model="form.email"
              :rules="[required]"
              class="mb-2"
              label="Email"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
              density="compact"
              v-model="form.gender"
              :rules="[required]"
              class="mb-2"
              :items="['М', 'Ж']"
              label="Пол"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-textarea
              v-model="form.comment"
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
    form: {
      manager: "",
      name: "",
      office: "",
      first_name: "",
      surname: "",
      last_name: "",
      phone: "",
      email: "",
      gender: "",
      comment: "",
    },
    users: [],
    office: [],
  }),
  mounted() {
    this.getUsers();
    this.getOffice();
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    async save() {
      this.form.name =
        this.form.first_name +
        " " +
        this.form.surname +
        " " +
        this.form.last_name;
      console.log(this.form);
      try {
        axios
          .post("/api/leads/", this.form)
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
          console.log(response.data);
          this.office = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
