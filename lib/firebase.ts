import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlng6hYdqyWtZyzxiPtshRbeywNik_RQM",
  authDomain: "pixchar-db409.firebaseapp.com",
  projectId: "pixchar-db409",
  storageBucket: "pixchar-db409.firebasestorage.app",
  messagingSenderId: "605217969016",
  appId: "1:605217969016:web:a168e4ca4aa4cb565e6e8d",
  measurementId: "G-S5F3YWSV9X",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
