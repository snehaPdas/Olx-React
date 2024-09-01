import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB6oFq8WlEqD1VC4KS52KaWu_YtSh7O6o8",
  authDomain: "olx-project-c9fd3.firebaseapp.com",
  projectId: "olx-project-c9fd3",
  storageBucket: "olx-project-c9fd3.appspot.com",
  messagingSenderId: "1013302331363",
  appId: "1:1013302331363:web:b04e3e8d383131418cc2d6",
  measurementId: "G-JN0PB0BL5Z",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firestore, auth, storage};
