<template>
    <div>
       <v-row class="mt-4">
           
           <v-col class="mx-auto" cols="10">
               <v-row>
                <v-col>
                    <h3 class="mt-4">My Posts</h3>
                </v-col>
               <v-col cols="3">
                    <v-date-picker v-model="date" color="green"></v-date-picker>
                </v-col>

                <v-col cols="7">
                    <v-card :elevation="3">
                        <v-card-title>Create Post</v-card-title>
                        <v-row>
                            <v-col class="mx-auto mt-4" cols="10">
                                <v-form ref="form">
                                    <v-text-field v-model="title"  label="Title" required></v-text-field>
                                    <v-textarea v-model="body" label="Body" auto-grow value="Type something awesome!"></v-textarea>
                                    
                                    <div class="text-right">
                                        <v-btn color="success" class="text-right" @click="savePost">Save</v-btn>

                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>
                        
                        
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
    name: 'Admin',
    data: () => {
        return {
            title: '',
            body: '',
            date: new Date().toISOString().substr(0, 10),
            userEmail: '',
            
            posts: [],
        }
    },
    created() {
        this.userEmail = this.$store.state.userInfo.email;
    },
    methods: {
        savePost() {
            db.collection("posts")
                .add({
                    author: this.userEmail,
                    body: this.body,
                    date_created: this.date,
                    title: this.title,
                    })
                .then(() => {
                    console.log("Post successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    },
}
</script>