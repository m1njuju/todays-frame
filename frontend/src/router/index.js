import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sub",
    name: "subhome",
    component: function () {
      return import("../components/SubList.vue");
    },
  },
  {
    path: "/write",
    name: "write",
    component: function () {
      return import("../components/WriteField.vue");
    },
  },
  {
    path: "/page/:id",
    name: "page",
    component: function () {
      return import("../views/PageView.vue");
    },
  },
  {
    path: "/updateform/:id",
    name: "updateform",
    component: function () {
      return import("../views/UpdateForm.vue");
    },
  },
  {
    path: "/about/:user",
    name: "about",
    component: function () {
      return import("../views/AboutView.vue");
    },
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../views/LoginView.vue");
    },
  },
  {
    path: "/setting",
    name: "setting",
    component: function () {
      return import("../components/SettingPage.vue");
    },
  },
  {
    path: "/register",
    name: "register",
    component: function () {
      return import("../views/RegisterView.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
