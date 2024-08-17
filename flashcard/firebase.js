// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXvWAKVPzZd1T6deyLQ3xgrW8Pt-ykHxE",
  authDomain: "flashcardsaas-1afdd.firebaseapp.com",
  projectId: "flashcardsaas-1afdd",
  storageBucket: "flashcardsaas-1afdd.appspot.com",
  messagingSenderId: "1087711103678",
  appId: "1:1087711103678:web:d31e6eb80e5c52b44b2cef",
  measurementId: "G-ZBKR6HJVY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);