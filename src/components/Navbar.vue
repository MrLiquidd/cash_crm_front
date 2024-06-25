<template>
  <nav>
    <v-app-bar color="grey-darken-4" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>Cash SRM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn color="grey" v-if="is_staff" href="/admin/users" text>
        <v-icon class="ma-2" icon="mdi-account-circle" size="large"></v-icon>
        <p>Сотрудники</p>
      </v-btn>
      <v-btn color="grey" v-if="is_staff" href="/admin/sells-client" text>
        <v-icon icon="mdi-currency-usd" size="x-large"></v-icon>
        <p>Торгующие клиенты</p>
      </v-btn>
      <v-btn color="grey" v-if="is_staff" href="/admin/office" text>
        <v-icon icon="mdi-domain" size="x-large"></v-icon>
        <p>Офисы</p>
      </v-btn>

      <v-btn href="/dashboard/reports/employee-ratings" text>
        <v-icon
          icon="mdi-poll"
          color="deep-purple-lighten-1"
          size="x-large"
        ></v-icon>
      </v-btn>
      <v-menu v-model="menu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn color="indigo" v-bind="props">
            <v-icon
              icon="mdi-plus-circle-outline"
              color="green"
              size="x-large"
            ></v-icon>
          </v-btn>
        </template>

        <v-card max-height="150">
          <v-list-item v-if="is_staff">
            <AddUser />
          </v-list-item>
          <v-list class="d-flex justify-space-around">
            <v-list-item>
              <AddClient />
            </v-list-item>
            <v-list-item>
              <AddEvent />
            </v-list-item>
            <v-list-item>
              <AddTopic />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn text id="notification" @click.stop="notif = !notif">
        <v-icon icon="mdi-bell-ring" size="x-large"></v-icon>
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="grey" v-bind="props">
            <v-avatar>
              <v-icon class="ma-2" icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-icon icon="mdi-chevron-down" size="x-large"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/dashboard/my-account" prepend-icon="mdi-cog">
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()" prepend-icon="mdi-account">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Menu -->
    <v-navigation-drawer :width="200" v-model="drawer" dark app>
      <v-list flat>
        <template v-for="link in links" :key="link.text">
          <v-list-item
            v-if="!link.staffOnly || (link.staffOnly && is_staff)"
            @click="handleClick(link)"
            :to="link.route ? link.route : null"
            router
            v-bind="link.route ? {} : {}"
          >
            <v-list-item-icon>
              <v-icon size="x-large">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon v-if="link.children && link.children.length">
              <v-icon>{{
                link.open ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list
            v-if="link.children && link.children.length && link.open"
            :key="`submenu-${link.text}`"
            class="submenu"
          >
            <v-list-item
              v-for="child in link.children"
              :key="child.text"
              :to="child.route"
              router
            >
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Notification -->
    <v-navigation-drawer v-model="notif" location="right" temporary>
      <p class="d-flex justify-center align-center h-100">
        У вас пока нет уведомлений
      </p>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/store/user";
import AddClient from "@/components/AddClientPopup.vue";
import AddEvent from "@/components/AddEventPopup.vue";
import AddTopic from "@/components/AddTopicPopup.vue";
import AddUser from "@/components/AddUserPopup.vue";

export default {
  name: "nav-bar",
  components: {
    AddClient,
    AddEvent,
    AddTopic,
    AddUser,
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data: () => ({
    drawer: false,
    fav: true,
    is_staff: "false",
    menu: false,
    notif: null,
    message: false,
    hints: true,
    links: [
      { icon: "mdi-home", text: "Главная", route: "/" },
      {
        icon: "mdi-account-multiple-outline",
        text: "Клиенты",
        route: "/dashboard/leads",
      },
      { icon: "mdi-calendar", text: "События", route: "/dashboard/events" },
      {
        icon: "mdi-view-dashboard",
        text: "Топики",
        route: "/dashboard/topics",
      },
      {
        icon: "mdi-file-remove",
        text: "Blacklist",
        route: "/dashboard/blacklist",
        staffOnly: true,
      },
      {
        icon: "mdi-chart-box",
        text: "Отчеты",
        route: null,
        open: false,
        children: [
          { text: "Продажи", route: "/dashboard/reports/sales" },
          {
            text: "Доп. продажи",
            route: "/dashboard/reports/additional-sales",
          },
          { text: "Найм персонала", route: "/dashboard/reports/hiring" },
          { text: "Операторы", route: "/dashboard/reports/operators" },
          {
            text: "Потерянные клиенты",
            route: "/dashboard/reports/lost-clients",
          },
          {
            text: "Список переходов клиентов по сотрудникам",
            route: "/dashboard/reports/client-transfers",
          },
          {
            text: "Рейтинги сотрудников",
            route: "/dashboard/reports/employee-ratings",
          },
        ],
      },
    ],
    profile: [
      {
        icon: "mdi-cog",
        text: "Профиль",
        route: "/dashboard/my-account",
        click: "",
      },
      {
        icon: "mdi-account",
        text: "Выйти",
        route: "",
        click: "logout()",
      },
    ],
  }),
  mounted() {
    const userStore = useUserStore();
    this.is_staff = userStore.user.is_staff;
  },

  methods: {
    async logout() {
      console.log("logout");
      await axios
        .post("/api/v1/token/logout/")
        .then(() => {
          console.log("Logged out");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });

      axios.defaults.headers.common["Authorization"] = "";

      this.userStore.removeToken();

      this.$router.push("/log-in");
    },
    handleClick(link) {
      if (link.children) {
        link.open = !link.open;
      } else if (link.route) {
        this.$router.push(link.route);
      }
    },
  },
};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
.drawer {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 10px;
}

.drawer ul {
  list-style: none;
  padding: 0;
}

.drawer li {
  padding: 10px;
}

.drawer a {
  color: white;
  text-decoration: none;
  display: block;
}

.submenu {
  margin-left: 20px;
  background-color: #34495e;
}

.v-list-item {
  cursor: pointer;
}
</style>
