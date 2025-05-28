import type { Metadata } from 'next'
import './globals.css'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlng6hYdqyWtZyzxiPtshRbeywNik_RQM",
  authDomain: "pixchar-db409.firebaseapp.com",
  projectId: "pixchar-db409",
  storageBucket: "pixchar-db409.firebasestorage.app",
  messagingSenderId: "605217969016",
  appId: "1:605217969016:web:a168e4ca4aa4cb565e6e8d",
  measurementId: "G-S5F3YWSV9X"
};


export const metadata: Metadata = {
  title: 'PixChar',
  description: 'ixChar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
