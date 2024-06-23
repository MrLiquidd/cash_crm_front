import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import LogIn from "@/views/LogInView.vue";
import MyAccount from "@/views/dashboard/MyAccountView.vue";
import Leads from "@/views/dashboard/LeadsView.vue";
import Event from "@/views/dashboard/EventView.vue";
import Topic from "@/views/dashboard/TopicView.vue";
import User from "@/views/profileCards/UserView.vue";
import Client from "@/views/profileCards/ClientView.vue";
import AdditionalSales from "@/views/dashboard/reports/AdditionalSalesView.vue";
import ClientTransfers from "@/views/dashboard/reports/ClientTransfersView.vue";
import EmployeeRatings from "@/views/dashboard/reports/EmployeeRatingsView.vue";
import Hiring from "@/views/dashboard/reports/HiringView.vue";
import LostClients from "@/views/dashboard/reports/LostClientsView.vue";
import Operators from "@/views/dashboard/reports/OperatorsView.vue";
import Sales from "@/views/dashboard/reports/SalesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/dashboard/my-account",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/leads",
    name: "Leads",
    component: Leads,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/events",
    name: "Event",
    component: Event,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/dashboard/topics",
    name: "Topic",
    component: Topic,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/client/:id",
    name: "Client",
    component: Client,
  },
  {
    path: "/user/:uuid",
    name: "Users",
    component: User,
  },
  {
    path: "/dashboard/reports/additional-sales",
    name: "AdditionalSales",
    component: AdditionalSales,
  },
  {
    path: "/dashboard/reports/client-transfers",
    name: "ClientTransfers",
    component: ClientTransfers,
  },
  {
    path: "/dashboard/reports/employee-ratings",
    name: "EmployeeRatings",
    component: EmployeeRatings,
  },
  {
    path: "/dashboard/reports/hiring",
    name: "Hiring",
    component: Hiring,
  },
  {
    path: "/dashboard/reports/lost-clients",
    name: "LostClients",
    component: LostClients,
  },
  {
    path: "/dashboard/reports/operators",
    name: "Operators",
    component: Operators,
  },
  {
    path: "/dashboard/reports/sales",
    name: "Sales",
    component: Sales,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
