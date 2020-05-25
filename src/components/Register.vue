<template>
    <div>
        <v-row class="mt-4">
            <v-col class="mx-auto" cols="4">
                <v-card :elevation="3">
                    <v-card-title>Register</v-card-title>
                    <v-row>
                        <v-col class="mx-auto mt-4" cols="10">
                            <v-form ref="form" v-model="valid" lazy-validation>                               

                                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                                <v-text-field v-model="password"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="showPassword ? 'text' : 'password'"
                                    name="password"  label="Password"  hint="At least 4 characters" counter
                                    @click:append="showPassword = !showPassword"
                                ></v-text-field>

                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="register">Register</v-btn>
                            </v-form>

                                <p class="mt-4">
                                    <v-btn small text to="/login" color="primary">Login instead</v-btn>
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
    name: 'Register',
    data: () => ({
      valid: true,
      
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 4) || 'Password must be greater than 4 characters',
      ],
            
    }),

    methods: {
        validate () {
                this.$refs.form.validate()
            },
        async register() {
            try {
                const newUser = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                console.log(newUser);
                this.$router.replace('/admin');
            } catch (err) {
                console.log(err);
                
            }
        },
    }
}
</script>