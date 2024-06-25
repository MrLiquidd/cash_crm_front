<template>
  <v-card prepend-icon="mdi-account" title="Добавить топик">
    <v-card-text>
      <v-row dense>
        <v-col cols="7" md="7" sm="7">
          <v-text-field
            v-model="form.theme"
            density="comfortable"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            label="Тема"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="4" md="4">
          <v-autocomplete
            v-model="form.status"
            :items="status"
            :readonly="loading"
            :rules="[required]"
            label="Статус"
            variant="outlined"
            density="comfortable"
            required
            auto-select-first
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <ckeditor
            :editor="editor"
            :config="editorConfig"
            v-model="form.description"
          />
        </v-col>
        <v-col cols="8" sm="8" md="8">
          <v-autocomplete
            v-model="form.author"
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
        <v-col cols="4" sm="4" md="4">
          <v-text-field
            v-model="form.deadline"
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
            label="Дедлайн"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="8" sm="8" md="8">
          <v-autocomplete
            v-model="form.personal_access"
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
        <v-col cols="4" sm="4" md="4">
          <v-select
            v-model="form.roles"
            :items="roles"
            label="Доступ для ролей"
            variant="outlined"
            density="comfortable"
            required
            auto-select-first
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item title="Select All" @click="toggle">
                <template v-slot:prepend>
                  <v-checkbox-btn
                    :color="likesSomeFruit ? 'white' : undefined"
                    :indeterminate="likesSomeFruit && !likesAllFruit"
                    :model-value="likesAllFruit"
                  ></v-checkbox-btn>
                </template>
              </v-list-item>

              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-file-input
            density="comfortable"
            label="File input"
            prepend-icon="mdi-camera"
            variant="filled"
            multiple
          ></v-file-input>
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
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useUserStore } from "@/store/user";
import CKEditor from "@ckeditor/ckeditor5-vue";
import axios from "axios";
export default {
  setup() {
    const userStore = useUserStore();
    userStore.initStore();

    return { userStore };
  },
  components: {
    ckeditor: CKEditor.component,
  },
  data: () => ({
    dialog: true,
    users: [],
    form: {
      roles: [],
      theme: "",
      status: "",
      author: "",
      data: "",
      personal_access: "",
      description: "<p>Content of the editor.</p>",
    },
    status: [
      "Не начато",
      "В работе",
      "Требует внимания",
      "Обсуждение",
      "Выполнено",
      "Просрочено",
    ],
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
    editor: ClassicEditor,
    editorConfig: {
      toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "textColor",
        "undo",
        "redo",
      ],
      // Настройка для плагина выбора цвета текста
      textColor: {
        options: [
          "rgb(0, 0, 0)", // Чёрный
          "rgb(255, 0, 0)", // Красный
          "rgb(0, 255, 0)", // Зелёный
          "rgb(0, 0, 255)", // Синий
        ],
      },
    },
  }),
  computed: {
    likesAllFruit() {
      return this.form.roles.length === this.roles.length;
    },
    likesSomeFruit() {
      return this.form.roles.length > 0;
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    toggle() {
      if (this.likesAllFruit) {
        this.form.roles = [];
      } else {
        this.form.roles = this.roles.slice();
      }
    },
    async save() {
      const userStore = useUserStore();
      this.form.author = userStore.user.id;

      try {
        axios
          .post("/api/topics/", this.form)
          .then((response) => {
            console.log("Topic added successfully:", response.data);
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
  },
};
</script>

<style>
/* Стили для CKEditor 5 */
.ck.ck-toolbar .ck-color-text-button .ck-button__icon {
  background-color: transparent !important;
}
</style>
