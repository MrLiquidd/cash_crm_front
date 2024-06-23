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
                <v-toolbar-title>Sign Up</v-toolbar-title>
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
                    id="password1"
                    prepend-icon="mdi-lock"
                    name="password1"
                    label="password"
                    type="password"
                    v-model="form.password1"
                  ></v-text-field>
                  <v-text-field
                    id="password2"
                    prepend-icon="mdi-lock"
                    name="password2"
                    label="password"
                    type="password"
                    v-model="form.password2"
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

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        password1: "",
        password2: "",
      },
      errors: [],
    };
  },

  methods: {
    submitForm() {
      this.errors = [];

      if (this.form.email === "") {
        this.errors.push("Your e-mail is missing");
      }

      if (this.form.name === "") {
        this.errors.push("Your name is missing");
      }

      if (this.form.password1 === "") {
        this.errors.push("Your password is missing");
      }

      if (this.form.password1 !== this.form.password2) {
        this.errors.push("The password does not match");
      }

      console.log(this.errors);

      if (this.errors.length === 0) {
        axios
          .post("/api/v1/signup/", this.form)
          .then((response) => {
            if (response.data.message === "success") {
              console.log(response.data);

              this.form.email = "";
              this.form.password1 = "";
              this.form.password2 = "";
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  },
};
</script>
