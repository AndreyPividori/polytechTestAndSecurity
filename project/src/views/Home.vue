<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>{{doc}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import firebase from "@/firebase.js";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data(){
    return {
      doc : "doc"
    }
  },
  computed: {
  },
  methods: {
    // function writeUserData(userId, name, email, imageUrl) {
    //   firebase
    //     .database()
    //     .ref("users/" + userId)
    //     .set({
    //       username: name,
    //       email: email,
    //       profile_picture: imageUrl
    //     });
    // }
    getDoc: async function(){
      let cityRef = firebase.db.collection('materiel').doc('K8MOGu5nVZ7XxcLTggN5');
      let doc = await cityRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    }
  },
  mounted() {
    this.getDoc();
  }
};
</script>
