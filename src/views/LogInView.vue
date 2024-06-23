<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid pa-0>
        <v-row align="right" justify="center" style="height: 100vh">
          <v-col
            cols="12"
            lg="6"
            md="6"
            class="grey lighten-2 fill-height d-flex flex-column justify-center align-center"
          >
            <v-card style="width: 400px">
              <v-toolbar dark color="grey">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-person"
                    name="email"
                    label="email"
                    type="text"
                    v-model="form.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="password"
                    type="password"
                    v-model="form.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <template v-if="errors.length > 0">
                <div class="bg-red-300 text-white rounded-lg p-6">
                  <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>
              </template>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-1" @click="submitForm()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/store/user.js";

export default {
  name: "log-in",
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async submitForm() {
      this.errors = [];

      if (this.form.email === "") {
        this.errors.push("Your e-mail is missing");
      }

      if (this.form.password === "") {
        this.errors.push("Your password is missing");
      }

      if (this.errors.length === 0) {
        console.log(this.form);
        await axios
          .post("/api/accounts/login", this.form)
          .then((response) => {
            this.userStore.setToken(response.data);

            axios.defaults.headers.common["Authorization"] =
              "JWT " + response.data.access;
          })
          .catch((error) => {
            console.log("error", error);
          });

        await axios
          .get("/api/accounts/me")
          .then((response) => {
            console.log(response.data);
            this.userStore.setUserInfo(response.data);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
};
</script>
