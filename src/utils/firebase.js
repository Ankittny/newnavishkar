import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCiPUjQ7y2pMTW5GhimRNhbyRcWsLEdask",
  authDomain: "navishkar-e6c1a.firebaseapp.com",
  projectId: "navishkar-e6c1a",
  storageBucket: "navishkar-e6c1a.appspot.com", // Fixed storage bucket
  messagingSenderId: "293732101570",
  appId: "1:293732101570:web:2118cf59b69f151a3dba5b",
  measurementId: "G-SMWPWCHK8R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, googleProvider, analytics };
