import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {gietAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDFxsTVl9pX_ibdXfWE9JfEVRkJ6l0gDMM",
  authDomain: "sembrando-conocimientos.firebaseapp.com",
  projectId: "sembrando-conocimientos",
  storageBucket: "sembrando-conocimientos.firebasestorage.app",
  messagingSenderId: "780126530004",
  appId: "1:780126530004:web:f368ebc721c76dc78f0e41",
  measurementId: "G-R4HE4KB7JK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 