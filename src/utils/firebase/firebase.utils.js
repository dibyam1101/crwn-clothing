// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
} from "firebase/firestore";

// TODO: Add SDKs for Firebase categoriesMap that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6M2nxzUAEaviImVhoZtg5Se2casZsAeg",
  authDomain: "crwn-clothing-f77eb.firebaseapp.com",
  projectId: "crwn-clothing-f77eb",
  storageBucket: "crwn-clothing-f77eb.appspot.com",
  messagingSenderId: "6024663600",
  appId: "1:6024663600:web:aa144cd685c9e2a16593f5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const db = getFirestore();

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

export const addDocumentsToCollection = async (
  collectionKey,
  objectsToAdd,
  fieldToBeUsedAsDocumentName
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(
      collectionRef,
      object[fieldToBeUsedAsDocumentName].toLowerCase()
    );
    batch.set(docRef, object);
  });

  await batch.commit();

  console.log("Firebase batch write operation finished!!");
};

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

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
    } catch (error) {
      console.log("Error occurred while creating the user document");
      console.log(error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  console.log("In firebase.utils createAuthUserWithEmailAndPassword ---");
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassoword = async (email, password) => {
  if (!email || !password) return;

  console.log("In firebase.utils signInUserWithEmailAndPassword ---");
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
