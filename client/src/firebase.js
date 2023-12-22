// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-ec061.firebaseapp.com",
  projectId: "mern-estate-ec061",
  storageBucket: "mern-estate-ec061.appspot.com",
  messagingSenderId: "985411954995",
  appId: "1:985411954995:web:575b40336dc6b17356f646"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);