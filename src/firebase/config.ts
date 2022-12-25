// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWMscLwdhRACJHtglZh7pVOgaAgPrzKvQ",
  authDomain: "test-e0d5f.firebaseapp.com",
  projectId: "test-e0d5f",
  storageBucket: "test-e0d5f.appspot.com",
  messagingSenderId: "748853952348",
  appId: "1:748853952348:web:4250ec64d11e1b3379cb99"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );