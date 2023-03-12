// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABcMwV2Dyr38Bg_fTKkUjplpVrh8-8kZE",
  authDomain: "propertywale-9e109.firebaseapp.com",
  projectId: "propertywale-9e109",
  storageBucket: "propertywale-9e109.appspot.com",
  messagingSenderId: "120220501692",
  appId: "1:120220501692:web:64cd3606f37eb166c072b9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();