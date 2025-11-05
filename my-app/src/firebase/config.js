import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBF0PMvNTPugAOZcC35njcd6xaFRwouvj4",
    authDomain: "petlyapp-2d0cb.firebaseapp.com",
    projectId: "petlyapp-2d0cb",
    storageBucket: "petlyapp-2d0cb.firebasestorage.app",
    messagingSenderId: "1077621854743",
    appId: "1:1077621854743:web:1453c379275837fd6fc252"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();