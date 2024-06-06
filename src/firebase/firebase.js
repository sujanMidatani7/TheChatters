
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAge62OVB1tFSjpouhWahMlTjD0TAbd6RI",
  authDomain: "chatroom-32976.firebaseapp.com",
  databaseURL: "https://chatroom-32976-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatroom-32976",
  storageBucket: "chatroom-32976.appspot.com",
  messagingSenderId: "695168650747",
  appId: "1:695168650747:web:e4a93db5a0d17cecc8cf5e",
  measurementId: "G-5ZDQXN7XYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAnalytics(app);
const auth = getAuth(app);
export {app, auth};