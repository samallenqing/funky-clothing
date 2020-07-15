import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCF6hqh7qyjva8RxZAV1D9E2g0HPi1NkPM",
    authDomain: "funky-clothing.firebaseapp.com",
    databaseURL: "https://funky-clothing.firebaseio.com",
    projectId: "funky-clothing",
    storageBucket: "funky-clothing.appspot.com",
    messagingSenderId: "630031997523",
    appId: "1:630031997523:web:15ca26d11812d1f36404a6",
    measurementId: "G-NNL39KVWPQ"
};
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdDate = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdDate,
                ...additionalData
            })
        } catch (error) {
            console.log('error in creating user', error.message);

        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;