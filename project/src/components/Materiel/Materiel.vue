<template>
  <div>
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