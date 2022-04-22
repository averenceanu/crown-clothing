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
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

// NOTES: getDoc and setDoc => getting the doc data and setting the doc data

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM-rsZGQd2NgLDTuSM-zCveEwdnCdpkUo",
  authDomain: "crwn-db-cabc5.firebaseapp.com",
  projectId: "crwn-db-cabc5",
  storageBucket: "crwn-db-cabc5.appspot.com",
  messagingSenderId: "792969065176",
  appId: "1:792969065176:web:d8ba509e4f893a95b21dad",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//providers are Google, facebook and so on
const provider = new GoogleAuthProvider();

//you can have multiple providers;
//For let's say signInWithRedirect you can create a new provider than for signInWithPopup.

provider.setCustomParameters({
  prompt: "select_account", // force to select an account
});

//auth should always be ONE for the duration of use of this website.
//You want the user to auth only once when using the website.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  //fetch the snapshot we want
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category //this is called casting, often done with interacting with 3rd party apis
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid); //connect to db and get user's uid
  const userSnapshot = await getDoc(userDocRef); //get user information
  //userSnapshot.exists() -> allows to see if the user exists

  //if user doesn' exist => set the user with the userSnapshot
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("There was an error", err);
    }
  }
  //if user data  exists just return it;
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  //open listener because it always listens for changes
  //you have to tell it to stop listening when the components unmounts > prevent memory leak
  onAuthStateChanged(auth, callback);
};
