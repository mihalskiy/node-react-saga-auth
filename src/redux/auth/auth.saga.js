import { put, takeLatest, all, call } from 'redux-saga/effects';
import actionTypes, {userCreateSuccess, userCreateFailed} from "./auth.action";
import {Api} from "./Api";

function* postNewUser(params) {
    try {
        yield call(Api.insertNewUser, params)
        yield put(userCreateSuccess({
            isRegister: true,
        }));
    } catch (error) {
        yield put(userCreateFailed({
            errorMessage: error.message
        }))
    }
}

function* postEnterUser(params) {
    try {
        const result = yield call(Api.loginUser, params);
        yield put(userCreateSuccess({
            isAuth: result.auth,
            token: result.token
        }));

    } catch (error) {
        yield put(userCreateFailed({
            errorMessage: error.message
        }))
    }
}

function* actionWatcher() {
    yield takeLatest(actionTypes.USER_CREATE, postNewUser);
    yield takeLatest(actionTypes.USER_ENTER, postEnterUser);
}

function* Watcher() {
    yield all([
        actionWatcher()
    ]);
}

export default Watcher;
