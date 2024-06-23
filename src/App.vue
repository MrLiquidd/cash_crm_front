<template>
  <v-app>
    <Navbar />
    <v-content class="ma-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { useUserStore } from "@/store/user";

export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },

  beforeCreate() {
    this.userStore.initStore();

    const token = this.userStore.user.access;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "JWT " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>
