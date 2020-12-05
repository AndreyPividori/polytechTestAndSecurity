<template>
  <div class="liste-materiel">
    <Loading v-show="isAllDocumentLoading" />
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
          :class="'is-clickable row_' + index"
          @click="goToMaterial(materiel.id, materiel)"
        >
          <td>
            {{ index + 1 }}
            <span v-if="materiel.available" class="tag is-success"
              >Disponible</span
            >
            <span v-else class="tag is-danger">Indisponible</span>
          </td>
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
import firebase from "@/firebase.js";
import Loading from "@/components/Utils/Loading";

export default {
  name: "ListeMateriel",
  props: {},
  components: { Loading },
  data() {
    return {
      aMateriel: [],
      isAllDocumentLoading: false
    };
  },
  computed: {},
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
          this.aMateriel = tempDoc;
        });
    },
    goToMaterial(keyDoc, docDatas) {
      this.$router.push({
        name: "Materiel",
        params: { id: keyDoc, oDatas: docDatas }
      });
    }
  },
  mounted() {
      this.isAllDocumentLoading = true;
    this.getAllDocsFromCollection("materiel");
      this.isAllDocumentLoading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
