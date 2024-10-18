import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0L_BLNvWx75eDoUgEyrxpS74CtV-Qh80",
  authDomain: "breezy-8c7dc.firebaseapp.com",
  projectId: "breezy-8c7dc",
  storageBucket: "breezy-8c7dc.appspot.com",
  messagingSenderId: "292996673635",
  appId: "1:292996673635:web:0fe10d8f3bfd72e505c856",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);