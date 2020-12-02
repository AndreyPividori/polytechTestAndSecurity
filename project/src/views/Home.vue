<template>
  <div class="home">
    <div>{{aMateriel}}</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="createDoc()">Creer</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import * as utils from "@/store/utils.js";
import firebase from "@/firebase.js";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data(){
    return {
      aMateriel: []
    }
  },
  computed: {},
  methods: {
    createDoc: function(){
      utils.createDoc("materiel", null);
    },
    getAllDocsFromCollection: function(collection){
      firebase.db.collection(collection)
      .get()
      .then(querySnapshot => {
        this.aMateriel = querySnapshot.docs.map(doc => doc.data())
      })
    }
  },
  mounted() {
    this.getAllDocsFromCollection("materiel");
  }
};
</script>
