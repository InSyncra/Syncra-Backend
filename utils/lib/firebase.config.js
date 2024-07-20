/**
 * Firebase configuration to connect to the backend
 * DO NOT MODIFY THIS FILE IN ANY WAY
 *
 * 
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: "devmate-6d52a",
    storageBucket: process.env.FIREBASE_STORAGE_URL,
    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
    appId: process.env.FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
