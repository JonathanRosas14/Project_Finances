import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../components/Home.vue";
import Features from "../components/Features.vue";
import About from "../components/About.vue";
import Prices from "../components/Prices.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/features",
    name: "Features",
    component: Features,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/prices",
    name: "Prices",
    component: Prices,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
