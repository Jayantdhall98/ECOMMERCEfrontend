import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import firebase from "firebase/compat/app"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3XHNruHmD002IMb76g3BBM6fxxF7-aIQ",
  authDomain: "ecommercee-74fa4.firebaseapp.com",
  projectId: "ecommercee-74fa4",
  storageBucket: "ecommercee-74fa4.appspot.com",
  messagingSenderId: "800177191212",
  appId: "1:800177191212:web:3892c7d1c440bcf67b5489"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
