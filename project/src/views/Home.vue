<template>
  <div>
    <div class="columns">
      <div class="column is-1"></div>
      <listeMateriel class="column is-10" />
      <div class="column is-1"></div>
    </div>
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
