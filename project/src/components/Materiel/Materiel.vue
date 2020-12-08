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
          <div class="has-text-left">
            <strong>Statut : </strong>
            <span v-if="doc.available">Disponible ✅</span>
            <span v-else>Indisponible 🚫</span>
          </div>
          <div v-if="!isEditting">
            <div class="has-text-left">
              <strong>Téléphone : </strong>
              <span>{{ doc.nom }}</span>
            </div>
            <div class="has-text-left">
              <strong>Référence : </strong>
              <span>{{ doc.ref }}</span>
            </div>
            <div class="has-text-left">
              <strong>Version : </strong>
              <span>{{ doc.version }}</span>
            </div>
            <div class="has-text-left">
              <strong>N° Téléphone : </strong>
              <span>{{ doc.tel }}</span>
            </div>
          </div>
          <div v-else>
            <div class="has-text-left">
              <strong>Téléphone : </strong>
              <input
                id="input-field-name"
                class="input is-small"
                type="text"
                :value="doc.nom"
                :class="isFormNameCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormNameCorrect" class="error">
                {{ formNameError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>Référence : </strong>
              <input
                id="input-field-ref"
                class="input is-small"
                type="text"
                :value="doc.ref"
                :class="isFormRefCorrect ? '' : 'is-danger'"
              />
            </div>
            <div class="has-text-left">
              <strong>Version : </strong>
              <input
                id="input-field-version"
                class="input is-small"
                type="text"
                :value="doc.version"
                :class="isFormVersionCorrect ? '' : 'is-danger'"
              />
              <div v-if="!isFormVersionCorrect" class="error">
                {{ formVersionError }}
              </div>
            </div>
            <div class="has-text-left">
              <strong>N° Téléphone : </strong>
              <input
                id="input-field-tel"
                class="input is-small"
                type="text"
                :value="doc.tel"
              />
            </div>

            <div class="has-text-left">
              <strong>Commentaire : </strong>
              <input
                id="input-field-comment"
                class="input is-small"
                type="text"
                :value="doc.comment"
              />
            </div>
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
      doc: "",
      isEditting: false,
      oData: {
        ref: "",
        version: "",
        tel: "",
        comment: "",
        nom: ""
      },
      isFormNameCorrect: true,
      formNameError: "Erreur : le nom que vous avez renseigné est incorrect.",
      isFormRefCorrect: true,
      formRefError:
        "Erreur : la référence que vous avez renseigné est incorrect.",
      isFormVersionCorrect: true,
      formVersionError:
        "Erreur : la version que vous avez renseigné est incorrect."
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
    },
    loadMateriel: async function() {
      let uniqDoc = firebase.db
        .collection("materiel")
        .doc(this.$route.params.id);
      let dData = await uniqDoc.get();
      this.doc = dData.data();
    },
    SaveChanges: function() {
      this.oData.nom = document.getElementById("input-field-name").value;
      this.oData.comment = document.getElementById("input-field-comment").value;
      this.oData.ref = document.getElementById("input-field-ref").value;
      this.oData.tel = parseInt(
        document.getElementById("input-field-tel").value
      );
      this.oData.version = document.getElementById("input-field-version").value;

      let AlphaNumRegEx = new RegExp(
        "^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$"
      );
      let versionRegEx = new RegExp("[0-9]{3}");

      let aVersions = this.oData.version.match(AlphaNumRegEx);
      let aNames = this.oData.nom.match(AlphaNumRegEx);

      let aRefs = this.oData.ref.substring(2).match(versionRegEx);

      if (
        this.oData.nom.length >= 1 &&
        this.oData.nom.length < 31 &&
        typeof this.oData.nom === "string" &&
        aNames != null
      ) {
        this.isFormNameCorrect = true;
      } else {
        this.isFormNameCorrect = false;
      }

      if (
        this.oData.version.length >= 3 &&
        this.oData.version.length <= 15 &&
        typeof this.oData.nom === "string" &&
        aVersions != null
      ) {
        this.isFormVersionCorrect = true;
      } else {
        this.isFormVersionCorrect = false;
      }

      if (
        (this.oData.ref.startsWith("AN") ||
          this.oData.ref.startsWith("XX") ||
          this.oData.ref.startsWith("AP")) &&
        aRefs != null
      ) {
        this.isFormRefCorrect = true;
      } else {
        this.isFormRefCorrect = false;
      }
      if (
        this.isFormNameCorrect &&
        this.isFormRefCorrect &&
        this.isFormVersionCorrect
      ) {
        firebase.db
          .collection("materiel")
          .doc(this.paramId)
          .update({
            nom: document.getElementById("input-field-name").value,
            tel: parseInt(document.getElementById("input-field-tel").value),
            ref: document.getElementById("input-field-ref").value,
            version: document.getElementById("input-field-version").value,
            comment: document.getElementById("input-field-comment").value
          });
        this.loadMateriel();
      }
      this.isEditting = !this.isEditting;
    }
  },
  mounted() {
    this.loadDocIfDirectSearch("materiel", this.paramId);
  }
};
</script>

<style></style>
