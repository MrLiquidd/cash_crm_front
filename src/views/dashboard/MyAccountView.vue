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
            align-items: center;
          "
        >
          <div>
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
      style="margin-top: 10px"
    >
      <canvas id="myChart"></canvas>
      <Bar :data="data" :options="options" />
    </v-card>
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
import { Bar } from "vue-chartjs";
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
  components: {
    Bar,
  },
  data() {
    return {
      id: this.$route.params.uuid,
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
  },
  methods: {
    edit() {},
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}.${month}.${year} ${hours}:${minutes}`;
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
