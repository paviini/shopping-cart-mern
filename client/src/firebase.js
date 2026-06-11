import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhpKBtwStlONs8q6tvhvhhMg3TelXprBs",
  authDomain: "shopping-cart-39f51.firebaseapp.com",
  projectId: "shopping-cart-39f51",
  storageBucket: "shopping-cart-39f51.firebasestorage.app",
  messagingSenderId: "912642054355",
  appId: "1:912642054355:web:dedeb38ea5d8b506b51c26"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);