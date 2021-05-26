import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8zBooZknFEC1BRWKvsRdjGU7dV6To_gE",
  authDomain: "clone-app-cf24b.firebaseapp.com",
  projectId: "clone-app-cf24b",
  storageBucket: "clone-app-cf24b.appspot.com",
  messagingSenderId: "1050837478314",
  appId: "1:1050837478314:web:1f72b011c3836070eb99d3",
  measurementId: "G-RXFTHHLW86",
};

const createApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = createApp.firestore();

export { auth, db };
