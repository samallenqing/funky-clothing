import {takeLatest, put, all, call} from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {googleProvider, auth, createUserProfileDocument} from "../../firebase/firebase.utils";
import {emailSignInSuccess, emailSingInFailure, googleSingInFailure, googleSingInSuccess} from "./user.action";

export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSingInSuccess({id:userSnapshot.id, ...userSnapshot.data()}))
    } catch (err){
        yield put(googleSingInFailure(err));
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload:{email, password}}){
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()})
        )
    } catch (err){
        put(emailSingInFailure(err))
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