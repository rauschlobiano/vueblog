import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        userInfo: {}
    },
    getters: {
        getIsLoggedIn() {
            return this.state.isLoggedIn
        },
        getUserInfo() {
            return this.state.userInfo
        },
    },
    actions: {
      
    },
    mutations: {
        setIsLoggedIn(state, val) {
            state.isLoggedIn = val;
        },
        setUserInfo(state, val) {
            state.userInfo = val;
        },
    }
})

