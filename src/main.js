import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { store } from './store'
import firebase from "./firestoreConfig"

Vue.prototype.$axios = axios;
Vue.config.productionTip = false


let app;

firebase.auth().onAuthStateChanged( x => {
  console.log(x);
  if(!app)
  {
    app = new Vue({
        router,
        vuetify,        
        store,
        render: h => h(App)
      }).$mount('#app')
  }
})
