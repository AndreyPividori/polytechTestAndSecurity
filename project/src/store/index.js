import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase.js";
import router from "../router/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user object in userCollections
      await firebase.db.collection('users').doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await firebase.db.collection('users').doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/signin') {
        router.push('/')
      }
    }
  }
});

export default store