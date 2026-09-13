import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8omvNX3yJGJRqFkR6ymcKUks5jyHNHXU",
  authDomain: "jassi-perfumes.firebaseapp.com",
  projectId: "jassi-perfumes",
  storageBucket: "jassi-perfumes.firebasestorage.app",
  messagingSenderId: "362815576960",
  appId: "1:362815576960:web:e83d1ff8dae6903fa77f65",
  measurementId: "G-FZ530CVK3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
