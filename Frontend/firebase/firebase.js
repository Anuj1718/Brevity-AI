// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwYDnMeSD8YGbXSKMWwJ6bvxIrpCJq4Go",
  authDomain: "brevity-a23e5.firebaseapp.com",
  projectId: "brevity-a23e5",
  storageBucket: "brevity-a23e5.firebasestorage.app",
  messagingSenderId: "549817590293",
  appId: "1:549817590293:web:5189baf38e8a7e61d6241c",
  measurementId: "G-D4WSDLBZSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };