// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: "AIzaSyA3h8t1IERic9GbyufXlgkk6dAMvWLdg8I",
  authDomain: "todo-app-reg.firebaseapp.com",
  projectId: "todo-app-reg",
  storageBucket: "todo-app-reg.appspot.com",
  messagingSenderId: "200552060469",
  appId: "1:200552060469:web:1ab56742c10336d7b2c37c",
  measurementId: "G-Y5S9TP0P5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);