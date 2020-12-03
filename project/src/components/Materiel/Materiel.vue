<template>
  <div>
      Vous vous trouvez sur le document {{this.$route.params.id}}
  </div>
</template>

<script>
import firebase from "@/firebase.js";
export default {
    name: "Materiel",
    props: {id: String},
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