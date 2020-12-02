import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase.js";
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
require('@/assets/main.scss');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  firebase,
  render: h => h(App)
}).$mount("#app");
