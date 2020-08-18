import {all, call, put, takeLatest} from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {auth, createUserProfileDocument, googleProvider} from "../../firebase/firebase.utils";
import {signInFailure, singInSuccess} from "./user.action";

export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user)
    } catch (err){
        yield put(signInFailure(err));
    }
}

export function* getSnapshotFromUserAuth(userAuth){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            singInSuccess({id: userSnapshot.id, ...userSnapshot.data()})
        )
    } catch (err){
        put(signInFailure(err))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload:{email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (err){
        put(signInFailure(err))
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}