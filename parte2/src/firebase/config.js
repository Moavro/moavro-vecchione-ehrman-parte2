import app from "firebase/app";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWUA5z4sioRwLNOojwXAZzdCHc3e5jQ9A",
    authDomain: "parte2-f553a.firebaseapp.com",
    projectId: "parte2-f553a",
    storageBucket: "parte2-f553a.appspot.com",
    messagingSenderId: "3357312633",
    appId: "1:3357312633:web:d57454605170d29ada76a8"
  };


  app.initializeApp(firebaseConfig);

  
  export const auth= firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();