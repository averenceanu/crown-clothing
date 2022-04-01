// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  //signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  getFirestore,
  doc, 
  getDoc,
  setDoc,
  collection, 
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'
// NOTES: getDoc and setDoc => getting the doc data and setting the doc data  


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

//providers are Google, facebook and so on 
const provider = new GoogleAuthProvider();

//you can have multiple providers; 
//For let's say signInWithRedirect you can create a new provider than for signInWithPopup.  

provider.setCustomParameters({
  prompt: 'select_account' // force to select an account
});

//auth should always be ONE for the duration of use of this website. 
//You want the user to auth only once when using the website.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore(); 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef)

  //fetch the snapshot we want
  const querySnapshot = await getDocs(q); 
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },  {})

  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid); //connect to db and get user's uid
  const userSnapshot = await getDoc(userDocRef); //get user information 
  //userSnapshot.exists() -> allows to see if the user exists


  //if user doesn' exist => set the user with the userSnapshot 
  if (!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date(); 

    try { 
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt,
        ...additionalInformation
      });
    } catch (err) {
      console.log("There was an error", err.message)
    }
  }

  //if user data  exists just return it;
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  //open listener because it always listens for changes 
  //you have to tell it to stop listening when the components unmounts > prevent memory leak 
  onAuthStateChanged(auth, callback)
};