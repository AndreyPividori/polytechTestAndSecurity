<template>
  <div>
    <h1 class="title">{{dUser}}</h1>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-6"></div>
      <div class="column is-4"></div>
      <div class="column is-1"></div>
    </div>
    <button @click="deleteAccount()">Delete</button>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Profil",
  components: {},
  data() {
    return {
      dUser: ""
    };
  },
  computed: {
  },
  methods: {
    getUser: async function() {
      let userId = firebase.auth.currentUser;
      let userDatas = await firebase.db.collection("users").doc(userId.uid).get()

      this.dUser = userDatas.data();
    },
    deleteAccount() {
      let userUid = firebase.auth.currentUser.uid;
      let _this = this;

      firebase.db
        .collection("users")
        .doc(userUid)
        .delete()
        .then(function() {
          firebase.auth.currentUser
            .delete()
            .then(() => {
              _this.$store.dispatch("logout");
              _this.$router.push("/login");
              alert("Votre compte a bien été supprimé");
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getUser()
  }
};
</script>

<style></style>
