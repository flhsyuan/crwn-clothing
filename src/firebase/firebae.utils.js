import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCzzKQbK4uaYRM363QoiPw1UO52vLS9sx0",
  authDomain: "crwn-clothing-beee3.firebaseapp.com",
  databaseURL: "https://crwn-clothing-beee3.firebaseio.com",
  projectId: "crwn-clothing-beee3",
  storageBucket: "crwn-clothing-beee3.appspot.com",
  messagingSenderId: "800396366872",
  appId: "1:800396366872:web:c4884cf49620aabb54df6d",
  measurementId: "G-M5PE3MQ73S",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
// google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
