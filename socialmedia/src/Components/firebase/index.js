import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBF4YdBaT-GcNDHVlvUuNpq9HGm4WG0Kew",
    authDomain: "social-acff5.firebaseapp.com",
    projectId: "social-acff5",
    storageBucket: "social-acff5.appspot.com",
    messagingSenderId: "263847013435",
    appId: "1:263847013435:web:be8120d84a01a80f25c01e",
    measurementId: "G-PPZL6YHV2M"
  };
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebase as default}