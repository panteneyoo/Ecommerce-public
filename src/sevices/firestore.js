import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAnYYV3M-49Lh2A3eXNLLUVNERLkDauKto",
    authDomain: "ecomm-5dacc.firebaseapp.com",
    projectId: "ecomm-5dacc",
    storageBucket: "ecomm-5dacc.appspot.com",
    messagingSenderId: "88363384728",
    appId: "1:88363384728:web:238d82d2332ba186b035ed"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();