<template>
  <div>
    <h1>Get Started</h1>
    <div>
      <label for="name">Name</label>
      <input v-model.trim="signupForm.name" type="text" placeholder="Nom" id="name" />
    </div>
    <div>
      <label for="forname">Title</label>
      <input v-model.trim="signupForm.forname" type="text" placeholder="Prénom" id="forname" />
    </div>
    <div>
      <label for="email">Email</label>
      <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input v-model.trim="signupForm.password" type="password" placeholder="*******" id="password" />
    </div>
    <button @click="signup()" class="button">Sign Up</button>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      signupForm: {
        name: '',
        forname: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.forname
      })
    }
  }
};
</script>

<style></style>
