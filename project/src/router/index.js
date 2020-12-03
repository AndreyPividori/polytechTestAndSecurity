import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignIn.vue")
  },
  {
    path: "/admin",
    name: "Administration",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue")
  },
  {
    path: "/materiel/:id",
    name: "Materiel",
    props: { default: true, sidebar: false },
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Materiel/Materiel.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
