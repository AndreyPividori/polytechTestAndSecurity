<template>
  <div class="liste-materiel">
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
        <tr
          v-for="(materiel, index) in aMateriel"
          :key="index"
          :class="'row_' + index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ materiel.nom }}</td>
          <td>{{ materiel.ref }}</td>
          <td>{{ materiel.tel }}</td>
          <td>{{ materiel.version }}</td>
          <td class="is-clickable">
            <a :href="materiel.photo">
              <v-img
                :src="materiel.photo"
                alt=""
                contain
                height="66px"
                width="100px"
              >
              </v-img>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as utils from "@/store/utils.js";
import firebase from "@/firebase.js";

export default {
  name: "ListeMateriel",
  props: {},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
