import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCzk3nLfcNbe7Hg66M_tVRMBb_xQGfkj40",
  authDomain: "netflix-clone-4651f.firebaseapp.com",
  projectId: "netflix-clone-4651f",
  storageBucket: "netflix-clone-4651f.appspot.com",
  messagingSenderId: "583142952826",
  appId: "1:583142952826:web:dec469a1045d9ac21950c3",
  measurementId: "G-S5CPSDMVHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)