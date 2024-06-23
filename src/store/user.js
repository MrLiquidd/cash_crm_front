import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "user",

  data() {},

  state: () => ({
    user: {
      isAuthenticated: false,
      id: null,
      email: null,
      access: null,
      refresh: null,
    },
  }),
  created() {
    this.clientData.name = localStorage.getItem("name") || "";
    this.clientData.middleName = localStorage.getItem("middleName") || "";
  },

  actions: {
    initStore() {
      console.log("initStore", localStorage.getItem("user.access"));

      if (localStorage.getItem("user.access")) {
        console.log("User has access!");

        this.user.access = localStorage.getItem("user.access");
        this.user.refresh = localStorage.getItem("user.refresh");
        this.user.id = localStorage.getItem("user.id");
        this.user.email = localStorage.getItem("user.email");
        this.user.full_name = localStorage.getItem("user.full_name");
        this.user.isAuthenticated = true;

        this.refreshToken();

        console.log("Initialized user:", this.user);
      }
    },

    setToken(data) {
      console.log("setToken", data);

      this.user.access = data.access;
      this.user.refresh = data.refresh;
      this.user.isAuthenticated = true;

      localStorage.setItem("user.access", data.access);
      localStorage.setItem("user.refresh", data.refresh);

      console.log("user.access: ", localStorage.getItem("user.access"));
    },

    removeToken() {
      console.log("removeToken");

      this.user.refresh = null;
      this.user.access = null;
      this.user.isAuthenticated = false;
      this.user.id = false;
      this.user.email = false;

      localStorage.setItem("user.access", "");
      localStorage.setItem("user.refresh", "");
      localStorage.setItem("user.id", "");
      localStorage.setItem("user.email", "");
    },

    setUserInfo(user) {
      console.log("setUserInfo", user);

      this.user.id = user.id;
      this.user.email = user.email;
      this.user.full_name = user.full_name;

      localStorage.setItem("user.id", this.user.id);
      localStorage.setItem("user.email", this.user.email);
      localStorage.setItem("user.full_name", this.user.full_name);

      console.log("User", this.user);
    },

    refreshToken() {
      axios
        .post("/api/accounts/refresh", {
          refresh: this.user.refresh,
        })
        .then((response) => {
          this.user.access = response.data.access;

          localStorage.setItem("user.access", response.data.access);

          axios.defaults.headers.common["Authorization"] =
            "JWT " + response.data.access;
        })
        .catch((error) => {
          console.log(error);

          this.removeToken();
        });
    },
  },
});
