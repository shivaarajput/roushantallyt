import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithCustomToken, onAuthStateChanged,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, signOut
} from 'firebase/auth';
import {
  getFirestore, collection, doc, setDoc, addDoc, updateDoc, deleteDoc,
  onSnapshot, serverTimestamp
} from 'firebase/firestore';

// ============================================================================
// FIREBASE CONFIGURATION & INITIALIZATION
// ============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCI4qRrEhAUM1b-847fnBMLXi4XYunhRtw",
  authDomain: "first-react-57599.firebaseapp.com",
  databaseURL: "https://first-react-57599-default-rtdb.firebaseio.com",
  projectId: "first-react-57599",
  storageBucket: "first-react-57599.firebasestorage.app",
  messagingSenderId: "815591185148",
  appId: "1:815591185148:web:4f8c140ea9c91cababd579"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';


export { auth, db, appId };