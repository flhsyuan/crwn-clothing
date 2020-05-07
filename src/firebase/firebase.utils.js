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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if the userAuth object is not exist
  if (!userAuth) return;

  // query the firebase of the current user snapShot
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // get the snapshot
  const snapShot = await userRef.get();

  //if the firebase does not have the user snapshot object then create the object we want to store
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  //loop through the array and for each of the object, add them into the
  objectsToAdd.forEach((obj) => {
    // ask the firebase to create a new document and generate an ID automatically
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

//destructing the actual data from the firebase
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  //
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// export const convertCollectionsSnapshotToMap = collections => {
//   const transformedCollection = collections.docs.map(doc => {
//     const { title, items } = doc.data();

//     return {
//       routeName: encodeURI(title.toLowerCase()),
//       id: doc.id,
//       title,
//       items
//     };
//   });

//   return transformedCollection.reduce((accumulator, collection) => {
//     accumulator[collection.title.toLowerCase()] = collection;
//     return accumulator;
//   }, {});
// };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
