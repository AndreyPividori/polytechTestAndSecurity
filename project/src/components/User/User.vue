<template>
  <div>{{id}}</div>
</template>

<script>
export default {
  name:"user",
  props: {
    id: {
      type: String,
      default: ""
    },
    oDatas: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>