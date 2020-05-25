import firebase from 'firebase'
import 'firebase/firestore'

console.log(process.env.VUE_APP_FIREBASE_API);


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API,
    authDomain: "vueblog-8e17d.firebaseapp.com",
    databaseURL: "https://vueblog-8e17d.firebaseio.com",
    projectId: "vueblog-8e17d",
    storageBucket: "vueblog-8e17d.appspot.com",
    messagingSenderId: "28101231306",
    appId: "1:28101231306:web:79269ec2331a3c4cd3aa33",
    measurementId: "G-R9W9M6LJZS"
  };


export default firebase.initializeApp(firebaseConfig);
