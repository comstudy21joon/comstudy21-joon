import firebase from "firebase/app";
// 개별 export 하려면 각각의 기능들을 import 해야 한다.
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
 
firebase.initializeApp(firebaseConfig);

//export default firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export const firebaseInstance = firebase;