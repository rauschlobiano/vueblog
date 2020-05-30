<template>
    <div>
       <v-row class="mt-4">
           
           <v-col class="mx-auto" cols="11">
               <v-row>
                <v-col cols="2">
                    <h3 class="mt-4">My Posts</h3>

                    <v-list-item v-for="post in userPosts" :key="post.id">
                        <v-list-item-content >
                            <v-list-item-title> {{ post.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> 
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
                                    <input type="file" @change="previewImage" accept="image/*" >
                                    
                                    <div class="text-right">
                                        <v-btn color="success" class="text-right" @click="savePost">Save</v-btn>

                                    </div>
                                    <div v-if="uploadValue>0">
                                        <p>Progress: {{uploadValue.toFixed()+"%"}}
                                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
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
            imageURL: '',
            picture: null,
            imageData: null,
            userPosts: [],
            uploadValue: 0,
        }
    },
    computed: {
        
    },

    created() {
        this.loadUserPosts();
    },
    
    methods: {
        savePost() {
            this.saveImage();
        },
        insertPost() {
            db.collection("posts")
            .add({
                author: this.$store.state.userInfo.email,
                body: this.body,
                date_created: this.date,
                title: this.title,
                imageURL: this.imageURL,
                })
            .then(() => {
                console.log("Post successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });            
        },
        saveImage() {
            const storageRef=firebase.storage().ref('blogimages/'+`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,
                snapshot => {
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    //after image is uploaded
                    if(this.uploadValue >= 100)
                    {                                    
                        storageRef.snapshot.ref.getDownloadURL()
                        .then( url => {
                            this.imageURL = url;
                            console.log(this.imageURL);
                            this.insertPost();
                        });
                    }
                }, 
                error => {
                    console.log(error.message)
                },
                () => {
                    this.uploadValue=100;
                });            
        },
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
        },
        loadUserPosts() {
            db.collection("posts")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                this.userPosts.push({
                    author: doc.id,
                    body: doc.data().body,
                    date_created: doc.data().date_created,
                    title: doc.data().title,
                    imageURL: doc.data().imageURL,
                    });                    
                });
                console.log(this.userPosts);                      
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        }
    },
}
</script>
<style scoped="">
img.preview {
    width: 200px;
}

</style>