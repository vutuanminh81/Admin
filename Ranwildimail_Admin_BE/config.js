const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyD49nwNOkF9PDaESxEDinvEnUZufqiO9HY",
  authDomain: "ranwildanimalbackup.firebaseapp.com",
  projectId: "ranwildanimalbackup",
  storageBucket: "ranwildanimalbackup.appspot.com",
  messagingSenderId: "706122048889",
  appId: "1:706122048889:web:0f1ae6c748a87b6c78fba8",
  measurementId: "G-1Y31KCCFPW"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
module.exports = db;