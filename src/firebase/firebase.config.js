import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCrKo6oqL7m5VJ3CFYxABHgQBHCqvvakpI",
  authDomain: "drivefleet-7cf62.firebaseapp.com",
  projectId: "drivefleet-7cf62",
  storageBucket: "drivefleet-7cf62.firebasestorage.app",
  messagingSenderId: "1080660814369",
  appId: "1:1080660814369:web:6d1fc7e737b22c07a31160",
  measurementId: "G-XDT692KZZS"
};

const app = initializeApp(firebaseConfig);

export default app;