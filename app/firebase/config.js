// Import the functions you need from the SDKs you need
import { initializeApp , getApps , getApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDVQmYEXrBoYD6a-3Xd7GeCgf6a9e9C2d0",
  authDomain: "fir-login-ishant.firebaseapp.com",
  projectId: "fir-login-ishant",
  storageBucket: "fir-login-ishant.firebasestorage.app",
  messagingSenderId: "866473818890",
  appId: "1:866473818890:web:f7efeb4fee5ac8a39418f3",
  measurementId: "G-MHX77TG00D"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)

export  {app , auth}