import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Search from "../views/Search.vue";
import Contact from "../views/Contact.vue";
import Error from "../views/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "*",
    redirect: "/error",
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
