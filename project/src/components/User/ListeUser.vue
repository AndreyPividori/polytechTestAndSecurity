<template>
  <div>
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th><abbr title="Position">Index</abbr></th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Niveau d'accès</th>
          <th>Email</th>
          <th>Mot de passe</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="'user_' + index"
          class="is-clickable"
        >
          <td @click="goToUser(user.id, user)">
            {{ index + 1 }}
          </td>
          <td @click="goToUser(user.id, user)">
            {{ user.name }}
          </td>
          <td @click="goToUser(user.id, user)">
            {{ user.forname }}
          </td>
          <td @click="goToUser(user.id, user)">
            <span v-if="user.isAdmin">Administrateur</span>
            <span v-else>Utilisateur</span>
          </td>
          <td @click="goToUser(user.id, user)">
            {{ user.email }}
          </td>
          <td
            @click="goToUser(user.id, user)"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <div v-if="hover">{{ user.password }}</div>
            <div v-else>**************</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ListeUser",
  props: {},
  components: {},
  data() {
    return {
      isAllDocumentLoading: false,
      hover: false
    };
  },
  computed: {
    ...mapState(["users"])
  },
  methods: {
    goToUser(keyDoc, docDatas) {
      this.$router.push({
        name: "User",
        params: { id: keyDoc, oDatas: docDatas }
      });
    },
    showPW() {},
    deletionVerif() {
      //TODO : Créer un modal demandant confirmation à l'utilisateur
      //TODO : Si l'utilisateur confirme, supprimer l'id
    }
  },
  mounted() {
    this.$store.dispatch("getAllDocsFromCollection", "users");
  }
};
</script>

<style></style>
