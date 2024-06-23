import { createApp } from "vue";
import { createPinia } from "pinia";
import { loadFonts } from "./plugins/webfontloader";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import vuetify from "./plugins/vuetify";

loadFonts();

axios.defaults.baseURL = "http://127.0.0.1:8000";

const app = createApp(App);

app.use(createPinia());
app.use(router, axios);
app.use(vuetify);

app.mount("#app");
