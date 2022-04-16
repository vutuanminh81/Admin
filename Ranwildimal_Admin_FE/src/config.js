import firebase from 'firebase/compat/app';
import "firebase/compat/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBPBBm9hMIgRCYXIF1eglTm1BMygUOkumY",
  authDomain: "ranwildimal.firebaseapp.com",
  projectId: "ranwildimal",
  storageBucket: "ranwildimal.appspot.com",
  messagingSenderId: "145722705403",
  appId: "1:145722705403:web:78ee7502ec7dc2007eb75e"
  };
export const app = firebase.initializeApp(firebaseConfig);
