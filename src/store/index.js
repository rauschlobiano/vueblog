import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "../firestoreConfig"
const db = firebase.firestore();

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        userInfo: {},
        posts: [],
    },   
    
    mutations: {
        setIsLoggedIn(state, val) {
            state.isLoggedIn = val;
        },
        setUserInfo(state, val) {
            state.userInfo = val;
        },
        setPosts(state, val) {
            state.posts.push(val);
                        
        }
    },

    actions: {
        getPosts: ({ commit }) => {

            db.collection("posts")
            .orderBy("createdon", "desc")
            .limit(50)
            .get()
            .then((snap) => {
                snap.forEach((doc) => {
                    var p = {
                        id: doc.id,
                        author: doc.data().author,
                        body: doc.data().body,
                        date_created: doc.data().date_created,
                        title: doc.data().title,
                        imageURL: doc.data().imageURL,
                    }
                    commit('setPosts', p);    
                });
                                            
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
    },


    getters: {
        getIsLoggedIn() {
            return this.state.isLoggedIn
        },
        getUserInfo() {
            return this.state.userInfo
        },
        getPosts() {
            return this.state.posts
        }
    },
})

