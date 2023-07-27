import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDckMLIHHfCwB8VpHN_ldBPnH0lv5hGidA",
    authDomain: "real-world-fbf58.firebaseapp.com",
    projectId: "real-world-fbf58",
    storageBucket: "real-world-fbf58.appspot.com",
    messagingSenderId: "655234496770",
    appId: "1:655234496770:web:49b4c51391ec7eff51ea1b",
    measurementId: "G-BDLFV85TWW"
  }; 

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log('error creating the user', error.message)
        }
    }
    
    return userDocRef;
  }