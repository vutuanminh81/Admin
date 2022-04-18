const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyDm-W73q1nj2YorBiU2pX2k1DxgWhlotbA",
  authDomain: "back-up2-eaea3.firebaseapp.com",
  projectId: "back-up2-eaea3",
  storageBucket: "back-up2-eaea3.appspot.com",
  messagingSenderId: "642011766088",
  appId: "1:642011766088:web:0982ea8491c1b554f6677d"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;