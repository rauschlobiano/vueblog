<template>
    <div>   
        <v-row class="mx-auto" max-width="600">
            <v-col class="mx-auto" cols="10">
                <v-row>
                    <v-col cols="9">
                        <v-card >
                            <div v-if="imageURL!=null">
                                <v-img max-height="400px" :aspect-ratio="16/9" :contain="true"  :src="imageURL" >
                                </v-img>
                            </div>
                            <v-card-title>{{ title }}</v-card-title>
                            <v-card-text>
                                <div class="mt-4 text-right">
                                    <p>{{author}} / {{date_created}}</p>
                                </div>
                                <div class="mt-4">
                                    <v-textarea v-model="body" readonly auto-grow></v-textarea>
                                </div>
                            
                            </v-card-text>
                            <v-card-actions>                               
                                
                                <v-btn color="primary" fab small dark>
                                <v-icon>mdi-facebook</v-icon>                                
                                </v-btn>
                                
                                <v-btn color="primary" fab small dark>
                                <v-icon>mdi-twitter</v-icon>                                
                                </v-btn>
                            
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card >
                            <v-card-text class="text-center">
                                <h3>Recent Posts</h3>                    
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
import { mapState } from 'vuex'

export default {
    name: 'Home',
    computed: {
        ...mapState(['posts']),
    },
    mounted() {
        
        setTimeout(() => {
            //load the latest post
            if(this.posts.length > 0)
            {
                this.loadPostDetails(0);
            }

        }, 1000);
        
    },
    data: () => {
        return {
            //posts: [],
            title: '',
            body: '',
            date_created: '',
            id: '',
            author: '',
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
            this.author = this.posts[index].author;
        },
        
    }

}
</script>