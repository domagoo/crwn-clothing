import {initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCZbaf_fyz53b4SXk66VwPkJEYGyfI_OKg",
  
    authDomain: "crwn-clothing-db-7df4f.firebaseapp.com",
  
    projectId: "crwn-clothing-db-7df4f",
  
    storageBucket: "crwn-clothing-db-7df4f.appspot.com",
  
    messagingSenderId: "884429543198",
  
    appId: "1:884429543198:web:4360467f58a2d305af9b0f"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user data exist
    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try { 
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
    //create / set the document with the data from userAuth in

    //return userDocRef


}