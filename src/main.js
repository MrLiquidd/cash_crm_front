import { createApp } from "vue";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import vuetify from "./plugins/vuetify";

loadFonts();

axios.defaults.baseURL = "http://77.220.213.252:8888";

const app = createApp(App);

app.use(createPinia());
app.use(router, axios);
app.use(vuetify);

app.mount("#app");
