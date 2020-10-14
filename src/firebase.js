import firebase from 'firebase/app';
import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyCK6ODtFp7_R7UFDKzCimFuqKHTgLPQDT8",
    authDomain: "fb-crud-react-864f8.firebaseapp.com",
    databaseURL: "https://fb-crud-react-864f8.firebaseio.com",
    projectId: "fb-crud-react-864f8",
    storageBucket: "fb-crud-react-864f8.appspot.com",
    messagingSenderId: "425594740291",
    appId: "1:425594740291:web:938aa6207ad76d8da2fef6"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const  db = fb.firestore();