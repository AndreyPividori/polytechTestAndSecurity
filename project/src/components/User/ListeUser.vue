<template>
  <div>
      {{aUsers}}
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
/*     goToMaterial(keyDoc, docDatas) {
      this.$router.push({
        name: "User",
        params: { id: keyDoc, oDatas: docDatas }
      });
    }, */
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