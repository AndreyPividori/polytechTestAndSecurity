<template>
  <div>
      <div class="columns">
          <div class="column is-1"></div>
          <div class="column is-4">
              <div>
                <a :href="oDatas.photo">
                    <v-img
                        :src="oDatas.photo"
                        alt=""
                    >
                    </v-img>
                </a>
              </div>
          </div>
          <div class="column is-6">
              <div class="has-text-left">
                 <strong>Statut : </strong> 
                    <span v-if="oDatas.available">Disponible ✅</span>
                    <span v-else >Indisponible 🚫</span>
              </div>
              <div class="has-text-left">
                 <strong>Téléphone : </strong> 
                 <span>{{oDatas.nom}}</span>
              </div>
              <div class="has-text-left">
                 <strong>Référence : </strong> 
                 <span>{{oDatas.ref}}</span>
              </div>
              <div class="has-text-left">
                 <strong>Commentaire : </strong> 
                 <span>{{oDatas.comment}}</span>
              </div>
              <br>
              <div class="has-text-left">
                <button class="button"> 🗓️Réserver maintenant !🗓️</button>
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
            default: ''
        },
        oDatas: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            }
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    }
}
</script>

<style>

</style>