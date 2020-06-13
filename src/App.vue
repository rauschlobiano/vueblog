<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/display">Display</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-spacer></v-spacer>

      <div v-if="loggedIn">
        <v-btn text to="/admin">{{this.userInfo.email}}</v-btn>
        <v-btn text @click="logOut">Logout</v-btn>
      </div>      
     <div v-else>
       <v-btn text to="/register">Register</v-btn>
       <v-btn text to="/login">Login</v-btn>
     </div>
      
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "./firestoreConfig"

export default {
  name: 'App',

  created() {
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        // this.loggedIn = true;
        // this.userInfo.email = x.email;
        this.$store.commit('setIsLoggedIn', true);
        this.$store.commit('setUserInfo', user);
        
        this.loggedIn = this.$store.state.isLoggedIn;
        this.userInfo = this.$store.state.userInfo;

        
      }
    })
    this.$store.dispatch('getPosts');
    console.log('from App.created');
    
  },

  components: {
    
  },

  data: () => ({
    loggedIn: false,
    userInfo: {},
  }),

  methods: {
    async logOut() {
      try {

        const user = await firebase.auth().signOut();
        console.log(user);
        this.loggedIn =false;
        this.$router.replace('/');
      } catch (error) {
        console.log(error);
        
      }
      
    }
  }
};
</script>
