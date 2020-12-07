<template>
  <div>
    <div class="columns" style="margin-top: 1em;">
      <div class="column is-1"></div>
      <div class="column is-10">
        <listeUser />
      </div>
      <div class="column is-1"></div>
    </div>
  </div>
</template>

<script>
import listeUser from "@/components/User/ListeUser";
export default {
  name: "Admin",
  components: { listeUser },
  data() {
    return {
    };
  }
};
</script>

<style></style>
