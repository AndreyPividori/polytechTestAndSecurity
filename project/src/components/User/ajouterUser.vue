<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <span class="close" @click="close()">&times;</span>
        <div class="modal-header">
          <slot name="header">
            <h3 class="title is-4">Ajouter un Utilisateur</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <form action="">
              <div class="field has-text-left">
                <label class="label">Nom* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.name"
                    type="text"
                    placeholder="Martin"
                    id="new-user-name"
                    required
                    class="input"
                    :class="isNameCorrect ? '' : 'is-danger'"
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Prénom :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.forname"
                    class="input"
                    type="text"
                    placeholder="Thomas"
                    id="new-user-forname"
                  :class="isForNameCorrect ? '' : 'is-danger'"
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Matricule :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.matricule"
                    class="input"
                    type="integer"
                    placeholder="e.g 30033"
                    id="new-user-matricule"
                  :class="isMatriculeCorrect ? '' : 'is-danger'"
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Role :</label>
                <div class="control">
                  <input
                    type="radio"
                    id="role-admin"
                    value="true"
                    v-model.trim="signupForm.role"
                  />
                  <label for="Administrateur">Administrateur</label>
                  <br />
                  <input
                    type="radio"
                    id="role-other"
                    value="false"
                    v-model.trim="signupForm.role"
                  />
                  <label for="Emprunteur">Emprunteur</label>
                  <br />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Email* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.email"
                    class="input"
                    type="text"
                    placeholder="toto@you.com"
                    id="new-user-email"
                    required
                  />
                </div>
              </div>

              <div class="field has-text-left">
                <label class="label">Mot de passe* :</label>
                <div class="control">
                  <input
                    v-model.trim="signupForm.password"
                    class="input"
                    type="text"
                    placeholder="**************"
                    id="new-user-pw"
                    required
                  />
                </div>
              </div>
            </form>
          </slot>
        </div>

        <div class="has-text-left is-size-7">* : Champs Obligatoires</div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="control">
              <button class="button is-primary" @click="addUser()">
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
  name: "ajouterUser",
  data() {
    return {
      signupForm: {
        name: "",
        forname: "",
        matricule: "",
        role: "",
        email: "",
        password: ""
      },
      isNameCorrect: true,
      isForNameCorrect: true,
      isEmailCorrect: true,
      isMatriculeCorrect: true,
      isPassWordCorrect: true,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async addUser() {
      let dDoc = null
      let _this = this;

      //TODO Checker si les champs sont bien remplis

      firebase.db.collection("users").where("email", "==", this.signupForm.email).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            dDoc = doc.id, " => ", doc.data()
        });
        if (dDoc === null) {
          let adminPW = _this.$store.state.userProfile.password;
          let adminEdmail = _this.$store.state.userProfile.email;

          _this.$store.dispatch("logout");
          
          _this.$store
            .dispatch("signup", {
              email: _this.signupForm.email,
              password: _this.signupForm.password,
              matricule: _this.signupForm.matricule,
              role: _this.signupForm.role,
              name: _this.signupForm.name,
              forname: _this.signupForm.forname
            })
            .then(function() {
              _this.relogAsAdmin(adminEdmail, adminPW);
            });
        }else {
          alert("Email déjà existant !")
        }
      })      
    },
    relogAsAdmin(email, pw) {
      this.$store.dispatch("logout");

      this.$store.dispatch("login", {
        email: email,
        password: pw
      });
    }
  }
};
</script>

<style></style>
