<template>
  <div>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
         <thead>
        <tr>
          <th><abbr title="Position">Index</abbr></th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Niveau d'accès</th>
          <th>Email</th>
          <th>Mot de passe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in aUsers" :key="'user_'+index" @click="goToUser(user.id,user)" class="is-clickable">
          <td>
            {{index + 1}}
          </td>
          <td>
            {{user.name}}
          </td>
           <td>
            {{user.forname}}
          </td>
          <td>
            <span v-if="user.isAdmin">Administrateur</span>
            <span v-else>Utilisateur</span>
          </td>
          <td>
            {{user.email}}
          </td>
          <td>
            {{user.password}}
          </td>
        </tr>
      </tbody>
      </table>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "ListeUser",
  props: {},
  components: { },
  data() {
    return {
      aUsers: [],
      isAllDocumentLoading: false
    };
  },
  computed: {
  },
  methods: {
    getAllDocsFromCollection: function(collection) {
      firebase.db
        .collection(collection)
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot.docs);
          let tempDoc = querySnapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          });
          this.aUsers = tempDoc;
        });
    },
     goToUser(keyDoc, docDatas) {
      this.$router.push({
        name: "User",
        params: { id: keyDoc, oDatas: docDatas }
      });
    }, 
    deletionVerif() {
      //TODO : Créer un modal demandant confirmation à l'utilisateur
      //TODO : Si l'utilisateur confirme, supprimer l'id
    }
  },
  mounted() {
    this.getAllDocsFromCollection("users");
  }
};
</script>

<style>

</style>