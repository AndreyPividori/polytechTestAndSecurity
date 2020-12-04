<template>
  <div>
    <h1>Bienvenue !</h1>
    <div>
    <label for="email">Email</label>
    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
    </div>
    <div>
    <label for="password1">Password</label>
    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
    </div>
    <button @click="login()" class="button">Log In</button>
    <div class="extras">
        <a @click="toggleForm()">Create an Account</a>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      showLoginForm: true,
    }
  },
  methods: {
    toggleForm() {
      this.$router.push({
        name: "SignUp"
      });
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  }
}
</script>

<style>

</style>