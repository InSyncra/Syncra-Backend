/**
 * Firebase configuration to connect to the backend
 * DO NOT MODIFY THIS FILE IN ANY WAY
 *
 * TODO: To get with Imani about Firebase Project Setup
 */

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: "devmate-test",
    storageBucket: process.env.FIREBASE_STORAGE_URL,
    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);