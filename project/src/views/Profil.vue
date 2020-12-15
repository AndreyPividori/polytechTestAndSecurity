<template>
  <div>
    <h1 class="title">Mon profil</h1>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4"></div>
      <div class="column is-6">
        <div class="has-text-right" style="padding-top: 1em;">
          <button
            class="button is-small"
            v-if="!isEditting"
            @click="isEditting = !isEditting"
          >
            Edit ✍️
          </button>
          <button class="button is-small" v-else @click="SaveChanges()">
            Save 💾
          </button>
        </div>
        <div style="padding-top: 5em;">
          <div>
            <div class="has-text-left">
              <strong>Nom : </strong>
              <span>{{ dUser.name }}</span>
            </div>
            <div class="has-text-left">
              <strong>Prénom : </strong>
              <span>{{ dUser.forname }}</span>
            </div>
            <div class="has-text-left">
              <strong>Email : </strong>
              <span>{{ dUser.email }}</span>
            </div>
            <div class="has-text-left">
              <strong>Matricule : </strong>
              <span>{{ dUser.matricule }}</span>
            </div>
            <div class="has-text-left">
              <strong>Rôle : </strong>
              <span>{{ dUser.isAdmin ? "Administrateur" : "Emprunteur" }}</span>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
    <button class="button is-danger" @click="verifDeletion()">Supprimer le compte</button>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "Profil",
  components: {},
  data() {
    return {
      dUser: "",
      isEditting: false,
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
    verifDeletion(){
      if(confirm("Etes-vous sur de supprimer votre compte ? \nCette action est irreversible.")){
        this.deleteAccount()
      }
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
