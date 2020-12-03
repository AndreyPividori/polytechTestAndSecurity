<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h3 class="title is-4">Ajouter un matériel</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <form action="">
              <div class="field has-text-left">
                <label class="label">Nom :</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="e.g iPhone 12"
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">N° Téléphone :</label>
                <div class="control">
                  <input
                    class="input"
                    type="integer"
                    placeholder="e.g 0611223344"
                  />
                </div>
              </div>
              <div class="field has-text-left">
                <label class="label">Version :</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g V8.6" />
                </div>
              </div>
              <div class="field has-text-left">
                <label class="label">Référence :</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g AP12" />
                </div>
              </div>
            </form>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="control">
              <button class="button is-primary" @click="$emit('close')">
                Submit
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase.js";

export default {
  name: "AjouterMateriel",
  props: {},
  data(){
    return {

    }
  },
  methods: {

  },
  mounted(){
    console.log(firebase.storage);
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
