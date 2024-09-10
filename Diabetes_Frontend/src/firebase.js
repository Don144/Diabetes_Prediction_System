import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuOrNUfSwrGQnbAGK3CzNeT-dvSyW3XKs",
    authDomain: "diabetes-prediction-syst-767b9.firebaseapp.com",
    projectId: "diabetes-prediction-syst-767b9",
    storageBucket: "diabetes-prediction-syst-767b9.appspot.com",
    messagingSenderId: "862841481275",
    appId: "1:862841481275:web:01c2378aa3e6969ece141e",
    measurementId: "G-CEEQQFBG90"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
