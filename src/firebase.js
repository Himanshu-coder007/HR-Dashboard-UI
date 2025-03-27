// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfNnTLKKotqrMP0DYgfRdumVbaUsX12jo",
  authDomain: "dashboard-1316d.firebaseapp.com",
  projectId: "dashboard-1316d",
  storageBucket: "dashboard-1316d.firebasestorage.app",
  messagingSenderId: "260887600765",
  appId: "1:260887600765:web:df31894f872c3920be5b14",
  measurementId: "G-8BSW1HW876",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
