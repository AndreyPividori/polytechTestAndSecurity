<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="createDoc()">Creer</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import * as utils from "@/store/utils.js"

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data(){
    return {}
  },
  computed: {},
  methods: {
    createDoc: function(){
      utils.createDoc("materiel", null);
    }
  },
  mounted() {
    console.log(utils.getAllDocs("materiel"));
  }
};
</script>
