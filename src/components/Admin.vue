<template>
    <div>
       <v-row class="mt-4">
           
           <v-col class="mx-auto" cols="11">
               <v-row>
                <v-col cols="3">
                    <h3 class="mt-4">My Posts</h3>
                    <v-list-item v-for="(post, i) in userPosts" :key="post.id" @click="loadPostDetails(i)">
                        <v-list-item-content >
                            <v-list-item-title> {{ post.title }}</v-list-item-title>
                            <v-list-item-subtitle><small> {{ post.body }} </small></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item> 
                </v-col>
                
                <v-col cols="9">
                    <v-card :elevation="3">
                        <v-card-title>Post Details</v-card-title>
                        <v-row class="mx-auto mt-4"> 
                            <v-col cols="10" class="mx-auto">
                                <v-form ref="form">
                                    <input type="file" @change="previewImage" accept="image/*" >
                                                                        
                                    <div v-if="saving==true">
                                        <p>Progress: {{uploadValue.toFixed()+"%"}}
                                        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
                                    </div>

                                    <div v-if="imageURL!=null || imageURL != ''">
                                        <v-row>
                                            <v-col cols="6">
                                                <h3>Main Image</h3>
                                                <v-img max-height="300px" :aspect-ratio="16/9" :contain="true"  :src="imageURL" >
                                                </v-img>                                                
                                            </v-col>                                            
                                        </v-row>
                                        <v-row>                                           
                                              
                                            <v-file-input label="Sub Images" prepend-icon="mdi-camera" v-model="subImageData" @change="addingSubImage"></v-file-input>   
                                                        
                                        </v-row>
                                        <v-row>
                                            <v-col v-for="i in subImageList" :key="i.url">
                                                <v-img max-height="200px" :aspect-ratio="16/9" :contain="true"  :src="i.url" >
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                    </div> 

                                    
                                    <div class="float-right ml-4">
                                        <v-menu v-model="menu2" :close-on-content-click="false"
                                            :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="date" label="Date" readonly v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                    </div>

                                    <v-text-field v-model="title"  label="Title" required></v-text-field>
                                    <v-textarea v-model="body" label="Body" auto-grow placeholder="Type something awesome!"></v-textarea>
                                    
                                     
                                    <div v-if="doing=='editing'">
                                        <p>Created On: {{ createdon }} </p>
                                        <p>Updated On: {{ updatedon }} </p>
                                    </div>  

                                    
                                    <v-row>
                                        <v-btn color="success" class="text-right" @click="savePost">Save</v-btn>
                                        <div v-if="saving==true">
                                            <v-progress-circular indeterminate color="primary"></v-progress-circular>                                        
                                        </div> 

                                    </v-row>
                                    
                                </v-form>
                            </v-col>
                        </v-row>                            
                    </v-card>
                </v-col>
                </v-row>
           </v-col>
        </v-row>   
        <div class="text-center">
            <v-snackbar v-model="snack_show" :timeout="snack_timeout" color="success">
                
                {{ snack_text }} 

            </v-snackbar>
        </div>
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
            images: [],
            userPosts: [],            
            author: '',
            createdon: '',
            updatedon: '',
            snack_show: false,
            snack_text: 'Changes Saved',
            snack_timeout: 1500,

            doing: 'creating',
            menu2: false,
            saving: false,
            picture: null,            
            imageData: null,
            subImageData: null,
            subImageList: [],
            uploadValue: 0,
            editid: '',
            editedimage: false,
        }
    },
    computed: {
        
    },

    created() {
    },
    mounted() {
        
        setTimeout(() => {
            console.log(this.author);
            
            this.loadUserPosts();
        }, 1000);    
    },
    
    methods: {
        loadPostDetails(index) {
            this.doing = 'editing';

            this.title = this.userPosts[index].title;
            this.author = this.userPosts[index].author;
            this.body = this.userPosts[index].body;
            this.date = this.userPosts[index].date_created;
            this.imageURL = this.userPosts[index].imageURL;
            this.createdon = this.userPosts[index].createdon;
            this.updatedon = this.userPosts[index].updatedon;   
            this.editid = this.userPosts[index].id;
            
            console.log(this.imageURL);
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

        deleteOldImage() {
            
           const img = firebase.storage().refFromURL('');
           console.log(img);
           
           // Delete the file
            img.delete().then(function() {
            console.log('Image deleted ' + img);
            
            }).catch(function(error) {
            console.log(error);
            
            });           
        },

        savePost() {
            this.saving = true;
            if(this.imageData!=null)   
            {
                
                console.log('Deleting old image.');                    
                this.deleteOldImage();
               
                console.log('Saving with image.');                
                this.saveImage();                
            }     
            else
            {
                console.log('without image.');
                this.insertPost();
            }           
        },

        addingSubImage() {
            var d = this.subImageData;
            console.log(this.subImageData);
            
            const storageRef = firebase.storage().ref('blogsubimages/'+ d.name ).put(d);
                storageRef.on(`state_changed`,
                    snapshot => {                                                          
                        storageRef.snapshot.ref.getDownloadURL()
                        .then( url => {
                            var newImage = {
                                url: url,
                                snapshot: snapshot
                            };
                            this.subImageList.push(newImage);
                            console.log(this.subImageList);
                            
                            //update the post
                            db.collection("posts")
                                .doc(this.editid)
                                .set({
                                    subImages: this.subImageList,            
                                    updatedon: new Date()
                                    })
                                .then(() => {                
                                    console.log('done updating.');
                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                });  
                        });                       
                    }, 
                    error => {
                        console.log(error.message)
                    },
                );                    
        },

        insertPost() {
            
            if(this.doing == "editing")
            {
                db.collection("posts")
                .doc(this.editid)
                .update({
                    author: this.$store.state.userInfo.email,                
                    body: this.body,
                    date_created: this.date,
                    title: this.title,
                    imageURL: this.imageURL,            
                    updatedon: new Date(),
                    })
                .then(() => {                
                    console.log('done updating.');
                    this.saving = false;
                    this.loadUserPosts();
                    this.snack_show = true;
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });      
            }
            else
            {
                db.collection("posts")
                .add({
                    author: this.$store.state.userInfo.email,                
                    body: this.body,
                    date_created: this.date,
                    title: this.title,
                    imageURL: this.imageURL,
                    createdon: new Date(),
                    updatedon: '',
                    })
                .then((x) => {
                    console.log(x.id);

                    this.doing = "editing";
                    this.editid = x.id;
                    
                    this.saving = false;
                    this.loadUserPosts();
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        },
        
        previewImage(event) {
            this.uploadValue=0;
            this.picture=null;
            this.imageData = event.target.files[0];
            this.imageURL = URL.createObjectURL(this.imageData);
            if(this.doing == 'editing')
            {
                this.editedimage = true;
            }
        },

        loadUserPosts() {
            //clear list first
            this.userPosts = [];
            db.collection("posts")
            .where("author","==",this.$store.state.userInfo.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                this.userPosts.push({
                    id: doc.id,
                    author: doc.data().author,
                    body: doc.data().body,
                    date_created: doc.data().date_created,
                    title: doc.data().title,
                    imageURL: doc.data().imageURL,
                    createdon: new Date(doc.data().createdon.seconds * 1000),
                    updatedon: new Date(doc.data().updatedon.seconds * 1000),
                    });                    
                });
                            
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
img {
  max-width: 100%;
}

</style>