// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9-xkoKOo3Wfmxde15JQJXi5Nfi5GUR3w",
  authDomain: "mobx-saaspainel.firebaseapp.com",
  projectId: "mobx-saaspainel",
  storageBucket: "mobx-saaspainel.firebasestorage.app",
  messagingSenderId: "707892334480",
  appId: "1:707892334480:web:7903c817b7d9d1a7692d15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };