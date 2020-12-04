<template>
  <div>
    This is an Admin page.
    {{userProfile}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      userProfile: this.$store.state.userProfile
    }
  },
};
</script>

<style></style>
