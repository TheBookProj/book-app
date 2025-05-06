// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkLRhRjHr78RJWOs-_8b91yZyTL0lceoU",
  authDomain: "book-project-4dbe1.firebaseapp.com",
  projectId: "book-project-4dbe1",
  storageBucket: "book-project-4dbe1.firebasestorage.app",
  messagingSenderId: "74284232148",
  appId: "1:74284232148:web:10c0e83c06b2bbb9793a41",
  measurementId: "G-ZVRCRCMFGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export { app }