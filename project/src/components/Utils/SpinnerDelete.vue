<template>
  <div id="deletionSpinner" >
      X
  </div>
</template>

<script>
export default {

}
</script>

<style>
#deletionSpinner {
    font-weight: 1000;
    color: #C14242;
    border-radius: 50%;
    -webkit-transition: -webkit-transform .2s ease-in-out;
          transition:         transform .2s ease-in-out;
}
#deletionSpinner:hover {
    color: #D80C0C;
    -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}
</style>