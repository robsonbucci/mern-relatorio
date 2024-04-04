// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-relatorio.firebaseapp.com",
  projectId: "mern-relatorio",
  storageBucket: "mern-relatorio.appspot.com",
  messagingSenderId: "901054891831",
  appId: "1:901054891831:web:7c59511d442332c7247cb2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
