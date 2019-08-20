import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDsH14CQBSCngw1WRHVXdchyEHCFVGQBgI',
  authDomain: 'tyche-trade-db.firebaseapp.com',
  databaseURL: 'https://tyche-trade-db.firebaseio.com',
  projectId: 'tyche-trade-db',
  storageBucket: '',
  messagingSenderId: '116728161161',
  appId: '1:116728161161:web:7bc4c7aee5000c37'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log(userAuth)
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  console.log(userRef)

  const snapShot = await userRef.get();
  console.log(snapShot)

  //snapShot of the user authentication object does not exist 
  if (!snapShot.exists) {
    // we will create a new user with today's date
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //We will set it on the document using the set method 
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  // We return user reference once the document object has been created
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;