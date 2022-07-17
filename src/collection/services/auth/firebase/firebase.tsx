import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyD-p6_f5XGsqY-ZHEOFurZczCUiNLYU1yI",
  authDomain: "test-f2c9f.firebaseapp.com",
  projectId: "test-f2c9f",
  storageBucket: "test-f2c9f.appspot.com",
  messagingSenderId: "403421721848",
  appId: "1:403421721848:web:7ee3f09fb8b66a2de4f70d",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  firestore,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
};
