<template>
    <div>   
        <v-row class="mx-auto" max-width="600">
            <v-col class="mx-auto" cols="10">
                <v-row>
                    <v-col cols="9">
                        <v-card >
                            <div v-if="imageURL!=null">
                                <v-img class="white--text align-end" :src="imageURL">
                                </v-img>
                            </div>
                            <v-card-title>{{ title }}</v-card-title>
                            <v-card-text>
                                
                            <div class="mt-4 text-right">
                                <p>{{date_created}}</p>
                            </div>
                            <div class="mt-4">
                                <p>{{body}}</p>
                            </div>
                            
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="deep-purple accent-4">
                                    Share
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card >
                            <v-card-text>
                                <h5>Posts</h5>                    
                            </v-card-text>    

                            <v-list-item v-for="(post, i) in posts" :key="post.id" @click="loadPostDetails(i)">
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
            title: '',
            body: '',
            date_created: '',
            id: '',
            imageURL: '',
        }
    },
    methods: {
        loadPostDetails(index) {
            
            this.title = this.posts[index].title;
            this.author = this.posts[index].author;
            this.body = this.posts[index].body;
            this.date_created = this.posts[index].date_created;
            this.imageURL = this.posts[index].imageURL;
        },
        getPosts() {
            db.collection("posts")
            .orderBy("date_created", "desc")
            .get()
            .then((res) => {
                res.forEach((doc) => {
                this.posts.push({
                    id: doc.id,
                    author: doc.author,
                    body: doc.data().body,
                    date_created: doc.data().date_created,
                    title: doc.data().title,
                    imageURL: doc.data().imageURL,
                    });
                    
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        },
    }

}
</script>