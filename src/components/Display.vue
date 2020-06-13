<template>
    <div>
        <v-row class="mr-2 ml-2">
            <v-col  xs="12" sm="6" md="3" lg="2" v-for="i in posts" :key="i.id">
                <v-hover
                    v-slot:default="{ hover }"
                    close-delay="200"
                >
                <v-card :elevation="hover ? 16 : 2" class="mx-auto" height="350">
                    <v-img class="white--text" height="200px" :src="i.imageURL"></v-img>
                    <v-card-title>
                    <div>
                        <span class="grey--text font-weight-light">000.00</span><br>
                        <span><h5 class="font-weight-light">{{i.title}}</h5></span>                   
                    </div>
                    </v-card-title>
                    <v-card-actions>
                        <!-- <v-btn flat color="orange">Share</v-btn>
                        <v-btn flat color="orange">Explore</v-btn> -->
                    </v-card-actions>
                </v-card>
                </v-hover>
            </v-col>            
        </v-row>
        
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'Display',
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
            hover: 0,
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