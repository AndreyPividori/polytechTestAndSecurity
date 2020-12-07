<template>
  <div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-4">
        <div>
          <a :href="doc.photo">
            <v-img :src="doc.photo" alt=""> </v-img>
          </a>
        </div>
      </div>
      <div class="column is-6">
        <div class="has-text-left">
          <strong>Statut : </strong>
          <span v-if="doc.available">Disponible ✅</span>
          <span v-else>Indisponible 🚫</span>
        </div>
        <div class="has-text-left">
          <strong>Téléphone : </strong>
          <span>{{ doc.nom }}</span>
        </div>
        <div class="has-text-left">
          <strong>Référence : </strong>
          <span>{{ doc.ref }}</span>
        </div>
        <div class="has-text-left">
          <strong>Commentaire : </strong>
          <span>{{ doc.comment }}</span>
        </div>
        <br />
        <div class="has-text-left">
          <button class="button" @click="isReserving = !isReserving">
            🗓️Réserver maintenant !🗓️
          </button>
        </div>
        <div v-if="isReserving">
          Réservation
        </div>
      </div>
      <div class="column is-1"></div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
export default {
  name: "Materiel",
  props: {
    id: {
      type: String,
      default: "",
      required: false
    },
    oDatas: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isReserving: false,
      paramId: this.id != undefined ? this.id : this.$route.params.id,
      doc: ""
    };
  },
  computed: {},
  methods: {
    loadDocIfDirectSearch: async function(collection, id) {
      if (this.oDatas == undefined) {
        let uniqDoc = firebase.db.collection(collection).doc(id);
        let dData = await uniqDoc.get();
        console.log(dData);
        this.doc = dData.data();
      } else {
        this.doc = this.oDatas;
      }
    }
  },
  mounted() {
    this.loadDocIfDirectSearch("materiel", this.paramId);
  }
};
</script>

<style></style>
