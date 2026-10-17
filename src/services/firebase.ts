import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// AS Refrigerations - Official Firebase Configuration (MOMO IT Managed)
export const firebaseConfig = {
  apiKey: "AIzaSyCSkfCwwEf-omXMWHbxgINwqSMQJnU7epg",
  authDomain: "as-refrigerations.firebaseapp.com",
  projectId: "as-refrigerations",
  storageBucket: "as-refrigerations.firebasestorage.app",
  messagingSenderId: "440675185698",
  appId: "1:440675185698:web:822eef9f078ca17a23867b"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore (asia-south1 Mumbai)
export const db = getFirestore(app);
