// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Try environment variables first, fallback to hardcoded values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCIJpRImv_V9JrVP9otsJ-M4LX4fy7RkyQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "language-709f8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "language-709f8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "language-709f8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "962048724768",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:962048724768:web:92b05f3da429d46c765145",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0T67XXJP8Y"
};

console.log('Firebase Config Loaded:', {
  projectId: firebaseConfig.projectId,
  usingEnvVars: !!import.meta.env.VITE_FIREBASE_API_KEY
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
export default app;