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
                    id="new-material-name"
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
                    id="new-material-tel"
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Version :</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g V8.6" id="new-material-version"/>
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Référence :</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g AP12" id="new-material-ref" />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Importer un image :</label>
                <div >
                  <v-btn @click="click1">...</v-btn>
                  <input type="file" ref="input1"
                    style="display: none"
                    @change="previewImage" accept="image/*" >                
                </div>
                <div v-if="imageData!=null">                     
                  <img class="preview" height="268" width="356" :src="img1">
                  <br>
                </div> 
              </div>
            </form>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="control">
              <button class="button is-primary" @click="createDoc()">
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
      caption : '',
      img1: '',
      imageData: null,
      oData: {
        nom : "",
        ref : "",
        version : "",
        tel : "",
        photo: ""
      }
    }
  },
  methods: {
    createDoc: async function() {
      this.oData.nom = document.getElementById("new-material-name").value;
      this.oData.ref = document.getElementById("new-material-ref").value;
      this.oData.tel = document.getElementById("new-material-tel").value;
      this.oData.version = document.getElementById("new-material-version").value;
      console.log(this.oData);
      await firebase.db.collection("materiel")
                        .doc()
                        .set(this.oData);
      this.$emit('close')
    },

    click1() {
      this.$refs.input1.click()   
    },

    previewImage(event) {
      this.uploadValue=0;
      this.img1=null;
      this.imageData = event.target.files[0];
      this.onUpload()
    }, 
    onUpload(){
      this.img1=null;
      let storageRef = firebase.storage.ref("Photo_Materiel/"+`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
      this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.img1 = url;
              this.oData.photo = url;
              console.log("url : " +this.img1)
            });
          }      
        );
    }
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
