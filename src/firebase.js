import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyBIJf1yzon2Z4gU3EpxJkRnI67H6IBpD5c",
  authDomain: "login-demo-62631.firebaseapp.com",
  projectId: "login-demo-62631",
  storageBucket: "login-demo-62631.firebasestorage.app",
  messagingSenderId: "395265556749",
  appId: "1:395265556749:web:d01e69b676fb5edea63044",
  measurementId: "G-LK7DP14BW2"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);