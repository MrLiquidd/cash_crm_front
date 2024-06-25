<template>
  <div>
    <v-card
      class="relatve border rounded-lg dashboard"
      :elevation="20"
      style="margin-top: 55px"
    >
      <v-row>
        <v-col cols="4">
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
                      {{ user.full_name }}
                    </p>
                    <p>{{ user.job_title }}</p>
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
                  <v-menu activator="parent" :location="start">
                    <v-list>
                      <v-list-item>
                        <v-btn
                          size="small"
                          variant="text"
                          @click="openChangePassword"
                          >Сменить пароль</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn
                          size="small"
                          variant="text"
                          @click="openEditProfile"
                          >Изменить пользователя</v-btn
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-spacer style="height: 10px"></v-spacer>
            <v-layout>
              <v-row no-gutters>
                <v-col cols="12" class="user-info">
                  <p>Офис:</p>
                  <p>{{ user.office }}</p>
                </v-col>
                <v-col cols="12" class="user-info2 relatve border rounded-lg">
                  <p>Телефон:</p>
                  <p>{{ user.phone }}</p>
                </v-col>
                <v-col cols="12" class="user-info">
                  <p>Никнейм:</p>
                  <p>{{ user.username }}</p>
                </v-col>
                <v-col cols="12" class="user-info2 relatve border rounded-lg">
                  <p>Email:</p>
                  <p>{{ user.email }}</p>
                </v-col>
                <v-col cols="12" class="user-info">
                  <p>Дата найма:</p>
                  <p>{{ formatDate(user.hire_data) }}</p>
                </v-col>
                <v-col cols="12" class="user-info2 relatve border rounded-lg">
                  <p>Срок работы:</p>
                  <p>{{ differenceInMonths(user.hire_data) }}</p>
                </v-col>
                <v-col cols="12" class="user-info">
                  <p>Паспорт:</p>
                  <p>{{ user.passport }}</p>
                </v-col>
              </v-row>
            </v-layout>
          </v-card>
        </v-col>
        <v-col
          cols="2"
          style="
            flex-direction: column;
            justify-content: flex-end;
            display: flex;
            align-items: center;
          "
        >
          <v-btn class="btn-static"> Статистика </v-btn>
          <v-btn class="btn-raiting" style="color: black"> Рейтинг </v-btn>
        </v-col>
        <v-col
          cols="6"
          style="
            flex-direction: column;
            justify-content: flex-end;
            display: flex;
            align-items: end;
          "
        >
          <v-row style="margin-top: 20px; margin-right: 20px">
            <v-btn
              variant="text"
              size="small"
              style="color: #e53935"
              dark
              @click="openDeleteClientDialog"
            >
              Настройки сотрудника
            </v-btn>
          </v-row>
          <div
            style="
              flex-direction: column;
              justify-content: flex-end;
              display: flex;
              align-items: center;
            "
          >
            <v-row no-gutters>
              <v-col cols="12" class="user-info2">
                <p>Текущий период</p>
                <p>{{ userRaiting.period }}</p>
              </v-col>
              <v-col cols="12" class="user-info">
                <p>Место в рейтинге</p>
                <img
                  src="https://acdpo.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcrown.0801706c.png&w=48&q=75"
                />
              </v-col>
              <v-spacer style="height: 10px"></v-spacer>
              <v-col cols="12" class="user-info2">
                <p>План продаж</p>
                <p>{{ userRaiting.planSell }}</p>
              </v-col>
              <v-spacer style="height: 10px"></v-spacer>
              <v-col cols="12" class="user-info">
                <p color="green">Выполнение плана</p>
                <p color="green">{{ userRaiting.planCompleted }}</p>
              </v-col>
              <v-spacer style="height: 10px"></v-spacer>
              <v-col cols="12">
                <v-progress-linear
                  :location="false"
                  bg-color="#92aed9"
                  buffer-color="#6a3e0b"
                  buffer-opacity="0"
                  color="#12512a"
                  height="12"
                  max="9"
                  min="0"
                  rounded
                ></v-progress-linear>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      class="relatve border rounded-lg dashboard"
      :elevation="20"
      style="margin-top: 10px"
    >
      <v-row style="margin-top: 10px">
        <v-col cols="4">
          <p class="pl-5" style="margin-bottom: -10px">Статистика Переходов</p>
        </v-col>
        <v-col cols="8"> </v-col>
      </v-row>
      <v-row style="margin-bottom: -20px">
        <v-col cols="4">
          <p class="pl-5">Переход с консультации на лекцию</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px; margin-bottom: -20px">
        <v-col cols="4">
          <p class="pl-5">Переход с консультации на лекцию</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px; margin-bottom: -20px">
        <v-col cols="4">
          <p class="pl-5">Переход с лекции на практику</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px; margin-bottom: -20px">
        <v-col cols="4">
          <p class="pl-5">Переход на последнюю практику</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px; margin-bottom: -20px">
        <v-col cols="4">
          <p class="pl-5">Переход на вопрос о счете</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px; margin-bottom: -20px">
        <v-col cols="4">
          <p class="pl-5">Переход на встречу</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row style="margin-top: -20px; margin-bottom: 10px">
        <v-col cols="4">
          <p class="pl-5">Переход на открытие счета</p>
        </v-col>
        <v-col cols="8">
          <v-progress-linear
            :location="false"
            bg-color="#92aed9"
            color="#4CAF50"
            height="10"
            max="100"
            :model-value="0"
            rounded
          >
            0%
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      class="relatve border rounded-lg dashboard"
      :elevation="20"
      style="margin-top: 55px"
    >
      <v-data-table
        :headers="colums"
        :items="rows"
        :search="search"
        :loading="loading"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:[`item.description`]="{ item }">
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
        <template v-slot:[`item.client.full_name`]="{ item }">
          <a :href="getClientUrl(item.client.id)" class="user-link">
            {{ item.client.full_name }}
          </a>
        </template>
        <template v-slot:[`item.reflective.full_name`]="{ item }">
          <a :href="getUserUrl(item.client.id)" class="user-link">
            {{ item.reflective.full_name }}
          </a>
        </template>
        <template v-slot:[`item.event_type`]="{ item }">
          <div>
            <span :class="getEventColor(item.status)" class="color-dot"></span>
            {{ item.event_type }}
          </div>
        </template>
        <template v-slot:[`item.status`]="{ value }">
          <v-chip :color="getStatusColor(value)"> {{ value }}</v-chip>
        </template>
        <template v-slot:[`item.data`]="{ item }">
          {{ formatDate(item.data) }}
        </template>
        <template v-slot:[`item.modified_at`]="{ item }">
          {{ formatDate(item.modified_at) }}
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="primary"> События отсутствуют </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <!-- Delete user -->
    <v-dialog v-model="delete_client_dialog" max-width="500">
      <v-card max-width="1000" title="Уволить сотрудника">
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card-title>Вы уверены?</v-card-title>
            </v-col>
          </v-row>
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
            text="Уволить"
            variant="tonal"
            @click="delete_client()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit user -->
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "user-view",
  data() {
    return {
      id: this.$route.params.uuid,
      delete_client_dialog: false,
      edit_dialog: false,
      user: {},
      userRaiting: {
        period: "Июнь 2024",
        raiting: "",
        planSell: "0",
        planCompleted: "0",
      },
      data: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      options: {
        responsive: true,
      },
      rows: [],
      colums: [
        {
          align: "start",
          key: "idd",
          sortable: true,
          title: "#",
        },
        {
          align: "start",
          key: "event_type",
          sortable: true,
          title: "Тип события",
        },
        {
          align: "start",
          key: "client.full_name",
          sortable: true,
          title: "Клиент",
        },
        {
          align: "start",
          key: "description",
          sortable: true,
          title: "Описание",
        },
        {
          align: "start",
          key: "data",
          sortable: true,
          title: "Дедлайн",
        },
        {
          align: "start",
          key: "client.office.office",
          sortable: true,
          title: "Офис",
        },
        {
          align: "start",
          key: "status",
          sortable: true,
          title: "Статус",
        },
        {
          align: "start",
          key: "reflective.full_name",
          sortable: true,
          title: "Исполнитель",
        },
        {
          align: "start",
          key: "modified_at",
          sortable: true,
          title: "Обновлено",
        },
      ],
    };
  },
  watch: {
    $route(toR) {
      this.id = toR.params["uuid"];
    },
  },

  mounted() {
    const userId = this.$route.params.uuid;
    this.fetchUserData(userId);
    this.fetchEvents();
  },
  methods: {
    edit() {},
    openDeleteClientDialog() {
      this.delete_client_dialog = true;
    },
    openEditProfile() {
      this.edit_dialog = true;
    },
    async fetchEvents() {
      axios
        .get("/api/events/")
        .then((response) => {
          this.rows = response.data.map((item, index) => ({
            idd: index + 1,
            ...item,
          }));
          this.loading = false;
          this.total = this.rows.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchUserData() {
      axios
        .get(`/api/accounts/me/`)
        .then((response) => {
          this.user = response.data;
          this.user.office = this.user.office.office;
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
    async delete_client() {
      try {
        axios
          .delete(`/api/accounts/${this.user.id}/`)
          .then((response) => {
            console.log("User deleted successfully:", response.data);
            this.delete_event_dialog = false;
          })
          .catch((error) => {
            console.error("Error deleting event:", error);
          });
      } catch (e) {
        console.error("Error deleting event:", e);
      }
    },
    getStatusColor(status) {
      // Функция для определения класса в зависимости от статуса
      switch (status) {
        case "Запланировано":
          return "#7270FF"; // Пример класса для активного статуса
        case "Обработано":
          return "yellow lighten-3";
        case "Выполнено":
          return "green lighten-3";
        case "Просрочено":
          return "red lighten-3";
        default:
          return ""; // По умолчанию никакой дополнительный класс
      }
    },
    getEventColor(status) {
      switch (status) {
        case "Выполнено":
          return "bg-success";
        case "Запланировано":
          return "bg-wait";
        case "Обработано":
          return "bg-yellow";
        case "Просрочено":
          return "bg-danger";
        default:
          return "bg-secondary";
      }
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
.user-info {
  display: flex;
  justify-content: space-between;
}
.user-info2 {
  display: flex;
  justify-content: space-between;
  background-color: "#43444D";
}

.btn-static {
  background-color: #7270ff;
  width: 240px;
}
.btn-raiting {
  background-color: #e0e0e0;
  margin: 10px 10px;
  width: 240px;
}
</style>
