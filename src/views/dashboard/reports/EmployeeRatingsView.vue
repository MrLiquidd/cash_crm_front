<template>
  <v-container style="margin-top: 100px" fluid>
    <!-- <v-row>
      <v-col cols="6"> </v-col>
      <v-col cols="6">
        <v-card
          class="relatve border rounded-lg dashboard"
          :elevation="20"
          justify="center"
          style="background-color: black; height: 60px"
        >
          <v-row align="center">
            <v-col cols="2" sm="2" md="2">
              <v-switch
                v-model="offices"
                :label="offices ? 'Офисы' : 'Офисы'"
                class="my-4"
              ></v-switch>
            </v-col>
            <v-col cols="10" sm="8" md="6">
              <v-text-field
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                label="Тип события"
                variant="outlined"
                density="compact"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col cols="12" v-for="(manager, index) in managers" :key="manager.id">
        <v-card
          :color="index < 1 ? '#7270FF' : index < 2 ? 'purple lighten-2' : ''"
          :elevation="20"
          class="mb-2"
          :text-color="
            index < 1 ? '#7270FF' : index < 2 ? 'purple lighten-2' : ''
          "
          dark
          height="80px"
        >
          <v-card-title class="d-flex align-center card-text">
            <h1 style="margin-right: 30px">{{ index + 1 }}</h1>
            <v-avatar
              class="me-4"
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            >
            </v-avatar>
            <div>
              <div style="font-size: small; font-weight: 600">
                {{ manager.full_name }}
              </div>
              <div style="font-size: small; font-weight: 400">
                {{ manager.job_title }}
              </div>
              <div style="font-size: small; font-weight: 400">
                {{ manager.office }}
              </div>
            </div>
            <v-spacer></v-spacer>
            <v-icon color="#52DD16">mdi-poll</v-icon>
            <p style="margin-left: 10px; font-size: medium">Недоступно</p>
            <div class="ml-2">{{ manager.status }}</div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      offices: false,
      total: 0,
      period: "06/2024",
      managers: [],
    };
  },
  mounted() {
    this.getAccounts();
  },
  methods: {
    async getAccounts() {
      axios
        .get("/api/accounts/")
        .then((response) => {
          this.managers = response.data;
          console.log(this.managers);
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

<style scoped>
.v-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.v-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: rgb(95, 250, 95);
}

.v-avatar img {
  border-radius: 50%;
}
</style>
