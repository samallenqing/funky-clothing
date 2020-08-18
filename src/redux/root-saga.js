import {all, call} from "redux-saga/effects";
import {fetchCollectionsStart} from "./shop/shop.sagas";
import {userSagas} from "./user/user.sages";

export default function* rootSage(){
    yield all([
        call(fetchCollectionsStart),
        call(userSagas)
    ])
}