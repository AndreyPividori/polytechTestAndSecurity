<template>
  <div class="home">
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th><abbr title="Position">Index</abbr></th>
          <th>Nom</th>
          <th>Référence</th>
          <th>N° Téléphone</th>
          <th>Version</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(materiel, index) in aMateriel" :key="index">
          <td>{{index+1}}</td>
          <td>{{ materiel.nom }}</td>
          <td>{{ materiel.ref }}</td>
          <td>{{ materiel.tel }}</td>
          <td>{{ materiel.version }}</td>
          <td><img :src="materiel.photo" /></td>
        </tr>
      </tbody>
    </table>
    <button @click="createDoc()">Creer</button>
  </div>
</template>

<script>
// @ is an alias to /src
import * as utils from "@/store/utils.js";
import firebase from "@/firebase.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      aMateriel: []
    };
  },
  computed: {},
  methods: {
    createDoc: function() {
      utils.createDoc("materiel", null);
    },
    getAllDocsFromCollection: function(collection) {
      firebase.db
        .collection(collection)
        .get()
        .then(querySnapshot => {
          this.aMateriel = querySnapshot.docs.map(doc => doc.data());
        });
    }
  },
  mounted() {
    this.getAllDocsFromCollection("materiel");
  }
};
</script>
