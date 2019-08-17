import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDsH14CQBSCngw1WRHVXdchyEHCFVGQBgI",
    authDomain: "tyche-trade-db.firebaseapp.com",
    databaseURL: "https://tyche-trade-db.firebaseio.com",
    projectId: "tyche-trade-db",
    storageBucket: "",
    messagingSenderId: "116728161161",
    appId: "1:116728161161:web:7bc4c7aee5000c37"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;