// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeH33MOxva6XNUOdOJ-KNYyApWm3lBVv8",
  authDomain: "gettingstartedwithfireba-7fca5.firebaseapp.com",
  projectId: "gettingstartedwithfireba-7fca5",
  storageBucket: "gettingstartedwithfireba-7fca5.appspot.com",
  messagingSenderId: "552884267727",
  appId: "1:552884267727:web:badb511b4867a46167a5ba",
  measurementId: "G-VXFGGR48Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)