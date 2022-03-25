// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM-rsZGQd2NgLDTuSM-zCveEwdnCdpkUo",
  authDomain: "crwn-db-cabc5.firebaseapp.com",
  projectId: "crwn-db-cabc5",
  storageBucket: "crwn-db-cabc5.appspot.com",
  messagingSenderId: "792969065176",
  appId: "1:792969065176:web:d8ba509e4f893a95b21dad"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); 

const provider = new GoogleAuthProvider();

//you can have multiple providers; 
//For let's say signInWithRedirect you can create a new provider than for signInWithPopup.  

provider.setCustomParameters({
  prompt: 'select_account' // force to select an account
});

//auth should always be ONE for the duration of use of this website. 
//You want the user to auth only once when using the website.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)