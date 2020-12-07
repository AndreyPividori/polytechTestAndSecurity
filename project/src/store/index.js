import Vue from "vue";
import Vuex from "vuex";
import firebase from "../firebase.js";
import router from "../router/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    Materiel: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setMaterialData(state, val) {
      state.Materiel = val;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await firebase.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await firebase.db
        .collection("users")
        .doc(user.uid)
        .set({
          name: form.name,
          forname: form.forname,
          isAdmin: false,
          email: form.email,
          password: form.password
        });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await firebase.db
        .collection("users")
        .doc(user.uid)
        .get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async logout({ commit }) {
      // log user out
      await firebase.auth.signOut();

      // clear user data from state
      commit("setUserProfile", {});

      // redirect to Home view
      if (router.currentRoute.path != "/") {
        router.push("/");
      }
    },
    async getAllDocsFromCollection({ commit }, collection){
      const aMateriel = await firebase.db.collection(collection).get()
        /*
        .then(querySnapshot => {
          const aMateriel = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
            
          });*/
          

          console.log(aMateriel);
          console.log(this.state);
          commit("setMaterialData", aMateriel.docs.map(d => {
            return {id: d.id, ...d.data()};
            })
          );
       

    }
  }
});

export default store;
