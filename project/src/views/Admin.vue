<template>
  <div>
<!--     <div class="columns" style="margin-top: 1em;">
      <div class="column is-1"></div>
      <listeMateriel class="column is-10" />
      <div class="column is-1">
        <div v-if="isUserAdmin()">
          <button id="myModal" class="button" @click="showModal = true">
            ➕
          </button>
           use the modal component, pass in the prop 
          <ajouterMateriel v-if="showModal" @close="showModal = false" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
     /*  userProfile: this.$store.state.userProfile */
    };
  }
};
</script>

<style></style>
