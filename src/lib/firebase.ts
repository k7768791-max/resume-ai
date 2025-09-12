
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6jAqtsKzEoWkdNRUkaP_uiFwL5dvY3II",
  authDomain: "resumeai-aey6u.firebaseapp.com",
  projectId: "resumeai-aey6u",
  storageBucket: "resumeai-aey6u.appspot.com",
  messagingSenderId: "98852257242",
  appId: "1:98852257242:web:cc29b9fb66f78d764794e3"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, storage, db, googleProvider };
