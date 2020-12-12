<template>
  <div>
    Mon profil
    <button @click="deleteAccount()">Delete</button>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Profil",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
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
  }
};
</script>

<style></style>
