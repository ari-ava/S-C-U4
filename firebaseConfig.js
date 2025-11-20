// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFxsTVl9pX_ibdXfWE9JfEVRkJ6l0gDMM",
  authDomain: "sembrando-conocimientos.firebaseapp.com",
  projectId: "sembrando-conocimientos",
  storageBucket: "sembrando-conocimientos.firebasestorage.app",
  messagingSenderId: "780126530004",
  appId: "1:780126530004:web:f368ebc721c76dc78f0e41",
  measurementId: "G-R4HE4KB7JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);