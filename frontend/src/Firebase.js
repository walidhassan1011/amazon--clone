// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA_azywkSeiCA-b-jM4z7Pdhk7W00aBAUs",
  authDomain: "clone-9eb9e.firebaseapp.com",
  projectId: "clone-9eb9e",
  storageBucket: "clone-9eb9e.appspot.com",
  messagingSenderId: "518204937029",
  appId: "1:518204937029:web:4c5bbf56d112655ca0a42c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

const db = getFirestore(app);
export { db };
