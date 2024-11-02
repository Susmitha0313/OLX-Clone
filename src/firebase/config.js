// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWJL42Dfpd2cuSQJU7ccaB1kG7U4eZlJk",
  authDomain: "olx-clone-1229f.firebaseapp.com",
  projectId: "olx-clone-1229f",
  storageBucket: "olx-clone-1229f.appspot.com",
  messagingSenderId: "59904066450",
  appId: "1:59904066450:web:38ed0faba050345392774b",
  measurementId: "G-QVV4FH0M6Z"
};
// Initialize Firebase
export const fireb = initializeApp(firebaseConfig);
export const firestore = getFirestore(fireb);
export const auth = getAuth();
export const storage = getStorage(fireb);

