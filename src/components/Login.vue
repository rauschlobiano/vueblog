<template>
    <div>
        <v-row class="mt-4">
            <v-col class="mx-auto" cols="4">
                <v-card :elevation="3">
                    <v-card-title>Login</v-card-title>
                    <v-row>
                        <v-col class="mx-auto mt-4" cols="10">
                            <v-form ref="form" v-model="valid" lazy-validation>                               

                                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                                <v-text-field v-model="password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                                    name="password"  label="Password"  counter
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>

                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">Login</v-btn>
                                
                            </v-form>
                            
                                <p class="mt-4">
                                    No account yet? <v-btn small text to="/register" color="primary">Create a new account</v-btn>
                                </p>

                        </v-col>
                    </v-row>
                    
                    
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'Login',
    data: () => ({
      valid: true,      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      showPassword: false,
    }),

    methods: {
        validate () {
                this.$refs.form.validate()
            },
        async login() {
            try {
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then( user => {
                    this.$store.commit('setIsLoggedIn', true);
                    this.$store.commit('setUserInfo', user);
                    this.$router.push('/admin');
                })                
                
            } catch (err) {
                console.log(err);
                
            }
        },
    }
}
</script>