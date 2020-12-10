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

                  <!-- <input
                    v-model.trim="signupForm.role"
                        class="input"
                        type="radio"
                        placeholder="e.g Administrateur"
                        id="new-user-matricule"
                    />
                    <label for="Admin" id="label-admin">Administrateur</label>
                    <label for="Other">Emprunteur</label> -->
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
      isNameComplete: true,
      isForNameComplete: true,
      isEmailComplete: true,
      isPassWordComplete: true
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    addUser() {
      let adminPW = this.$store.state.userProfile.password;
      let adminEdmail = this.$store.state.userProfile.email;

      this.$store.dispatch("logout");
      let _this = this;

      this.$store
        .dispatch("signup", {
          email: this.signupForm.email,
          password: this.signupForm.password,
          matricule: this.signupForm.matricule,
          role: this.signupForm.role,
          name: this.signupForm.name,
          forname: this.signupForm.forname
        })
        .then(function() {
          _this.relogAsAdmin(adminEdmail, adminPW);
        });
    },
    relogAsAdmin(email, pw) {
      this.$store.dispatch("logout");

      console.log("Logout Passé");
      this.$store.dispatch("login", {
        email: email,
        password: pw
      });
    }
  }
};
</script>

<style></style>
