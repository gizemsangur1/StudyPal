import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOq3h4Ah5tK4whcNAZGUyjpdt_tb-zQVk",
  authDomain: "studypalb0.firebaseapp.com",
  projectId: "studypalb0",
  storageBucket: "studypalb0.firebasestorage.app",
  messagingSenderId: "603412045421",
  appId: "1:603412045421:web:ea311a909874b1f4fea964",
  measurementId: "G-R9PBS2FQVV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

