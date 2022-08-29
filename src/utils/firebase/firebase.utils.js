import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider} 
from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBgluhVP8RPSvpgHeG3x3DT0RdRcWMQVj4",
    authDomain: "crwn-clothing-db-6e371.firebaseapp.com",
    projectId: "crwn-clothing-db-6e371",
    storageBucket: "crwn-clothing-db-6e371.appspot.com",
    messagingSenderId: "914041955913",
    appId: "1:914041955913:web:b4f7ca72bfc463ea8ac198"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createAt = new Date();

      try { 
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt
        })
      } catch(error){
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
  };

