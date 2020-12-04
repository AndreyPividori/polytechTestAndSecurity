<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation" style="background-color:#DCDCDC;">
      <div class="navbar-brand">
        <img src="./assets/LogoProject.png" width="100" height="25" />

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        style="padding-bottom: 1em;"
      >
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/admin"
            >Administration</router-link
          >
          <router-link class="navbar-item" to="/about">A propos</router-link>
          <router-link class="navbar-item" to="/profil">A propos</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="showNav" class="buttons">
              <router-link class="navbar-item button is-primary" to="/signup"
                >Sign Up</router-link
              >
              <router-link class="navbar-item button is-light" to="/login"
                >Log In</router-link
              >
            </div>
            <div v-else class="buttons">
              <div style="padding-right:1em;"> Bienvenue, <router-link tag="a" to="/profil">{{this.userProfile.forname}} 👤 </router-link></div><button class="navbar-item button is-danger" @click="logout()"> Log Out </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
    }
  },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return !(Object.keys(this.userProfile).length > 1)
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  a:hover {
    color: rgba(66, 185, 131, 0.6);
  }
}
</style>
