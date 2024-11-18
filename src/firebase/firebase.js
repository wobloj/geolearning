// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIAOZmKIkW_i9Q47pXxvJVW0khHa3aZTU",
  authDomain: "geolearning-b1a9a.firebaseapp.com",
  projectId: "geolearning-b1a9a",
  storageBucket: "geolearning-b1a9a.appspot.com",
  messagingSenderId: "902698420731",
  appId: "1:902698420731:web:9fad56dd5d8005aa1b635e",
  measurementId: "G-8Z93XTS7RP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
