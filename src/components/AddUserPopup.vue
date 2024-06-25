<template>
  <div class="pa-4 text-center">
    <v-btn
      @click="dialog = true"
      size="small"
      color="grey-lighten-4"
      text="Сотрудник"
      variant="flat"
    ></v-btn>

    <v-dialog v-model="dialog" max-width="480">
      <v-card title="Добавить сотрудника">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
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
            <v-col cols="12" md="6" sm="6">
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

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                density="compact"
                v-model="form.last_name"
                :readonly="loading"
                class="mb-2"
                label="Отчество"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                density="compact"
                v-model="form.checkMT5"
                :readonly="loading"
                class="mb-2"
                label="Cчет MT5"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                density="compact"
                v-model="form.email"
                :rules="[required]"
                class="mb-2"
                label="Email"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-autocomplete
                v-model="form.job_title"
                density="compact"
                :items="roles"
                :readonly="loading"
                :rules="[required]"
                label="Должность"
                variant="outlined"
                required
                auto-select-first
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6" sm="6">
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
            <v-col cols="12" md="6" sm="6">
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
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn text="Отмена" variant="text" @click="dialog = false"></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="mt-2"
            text="Далее"
            @click="
              dialog2 = true;
              dialog = false;
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="480">
      <v-card title="Добавить сотрудника">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                density="compact"
                v-model="form.passportSeria"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Серия"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                density="compact"
                v-model="form.passportNumber"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Номер"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4">
              <v-text-field
                density="compact"
                v-model="form.passportDate"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                label="Дата выдачи"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="6">
              <v-textarea
                v-model="form.passportWho"
                label="Кем выдан"
                density="compact"
                variant="outlined"
                counter
                single-line
                row-height="20"
                rows="2"
                auto-grow
                no-resize
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-checkbox
                color="success"
                value="Passport"
                label="Паспорт РФ"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn
            text="Назад"
            variant="text"
            @click="
              dialog2 = false;
              dialog = true;
            "
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="my-2"
            text="Далее"
            @click="
              dialog3 = true;
              dialog2 = false;
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog3" max-width="480">
      <v-card title="Добавить сотрудника">
        <v-card-text>
          <h5 style="margin-bottom: 10px">
            Приложите фото документа с обеих сторон
          </h5>
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            label="Фото"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text="Назад"
            variant="text"
            @click="
              dialog3 = false;
              dialog2 = true;
            "
          ></v-btn>
          <v-spacer></v-spacer>
          <v-btn text="Добавить" variant="tonal" @click="save()"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
    dialog2: false,
    dialog3: false,
    form: {
      surname: "",
      first_name: "",
      last_name: "",
      checkMT5: "",
      email: "",
      job_title: "",
      phone: "",
      office: "",
      passportSeria: "",
      passportNumber: "",
      passportDate: "",
      passportWho: "",
      passport: "",
      password: "00000000",
      password2: "00000000",
    },
    roles: [
      "Претендет",
      "Стажер",
      "Менеджер",
      "Старший менеджер",
      "Топ мененжер",
      "Руководитель отдела продаж",
      "Региональный директор",
      "Руководитель группы",
      "Зам.директора по развитию",
      "Директор по развитию",
      "Бухгалтер",
      "Менеджер по привлечению",
      "Старший менеджер по привлечению",
      "Оператор",
      "Hr",
      "Руководитель операторов",
      "Аналитик",
    ],
    office: [],
  }),
  mounted() {
    this.getOffice();
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    async save() {
      this.form.passport =
        this.form.passportNumber +
        " " +
        this.form.passportSeria +
        " " +
        this.form.passportDate +
        " " +
        this.form.passportWho;
      console.log(this.form);
      try {
        axios
          .post("/api/accounts/signup/", this.form)
          .then((response) => {
            console.log("User added successfully:", response.data);
            this.dialog3 = false;
          })
          .catch((error) => {
            console.error("Error adding client:", error);
          });
      } catch (e) {
        console.error("Error adding client:", e);
      }
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
