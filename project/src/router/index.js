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
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "LogIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LogIn.vue")
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
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/Materiel/Materiel.vue"
      ),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
