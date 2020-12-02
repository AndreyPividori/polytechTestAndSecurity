<template>
  <div class="home">
    <listeMateriel />
    <button @click="createDoc()">Creer</button>
  </div>
</template>

<script>
// @ is an alias to /src
import listeMateriel from "@/components/Materiel/ListeMateriel"

export default {
  name: "Home",
  components: {listeMateriel},
  data() {
    return {
      aMateriel: [],
    };
  },
  computed: {},
  methods: {}
};
</script>
