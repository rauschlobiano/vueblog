<template>
    <div>   
        <v-row class="mx-auto" max-width="600">
            <v-col class="mx-auto" cols="8">
                <v-row>
                    <v-col cols="8">
                        <v-card >
                            <v-card-text>
                                <h1>Title</h1>
                                <div class="mt-4 text-right">
                                    <p>January 01 , 2020</p>
                                </div>
                                <div class="mt-4">
                                    <p>Body asdf as df as d fa sdf </p>
                                </div>
                            
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="deep-purple accent-4">
                                    Share
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card >
                            <v-card-text>
                                <h5>Posts</h5>                    
                            </v-card-text>    

                            <v-list-item v-for="post in posts" :key="post.id">
                                <v-list-item-content >
                                    <v-list-item-title> {{ post.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>               
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            
        </v-row>     
        
    </div>
</template>
<script>
import firebase from "../firestoreConfig"
const db = firebase.firestore();

export default {
    name: 'Home',
    created() {
        this.getPosts();
    },
    data: () => {
        return {
            posts: [],
        }
    },
    methods: {
        getPosts() {
            db.collection("posts")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                this.posts.push({
                    author: doc.id,
                    body: doc.data().body,
                    date_created: doc.data().date_created,
                    title: doc.data().title,
                    });
                    console.log(doc.id, " => ", doc.data());
                });
                console.log(this.posts);
                      
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        },
    }

}
</script>