import { put, takeLatest, all } from 'redux-saga/effects';
import actionTypes, {userCreateSuccess, userCreateFailed} from "./auth.action";
import {Api} from "./Api";

function* postNewUser(params) {
    const {password, s_password} = params.payload.data;

    if (password === s_password) {
        yield Api.insertNewUser(params)

        const data = localStorage.getItem('token');

        if (data !== 'undefined') {
            yield put(userCreateSuccess({
                isRegister: true,
            }));
        } else {
            yield put(userCreateFailed( {
                e: 'error'
            }))
        }

    } else {
        yield put(userCreateFailed( {
            e: 'err'
        }));
        console.error(`Error is : ${params}`);
    }
}

function* postEnterUser(params) {
    try {
        const result = yield Api.loginUser(params);

        yield put(userCreateSuccess({
            isAuth: result.auth,
            token: result.token
        }));

    } catch (error) {
        yield put({ type: actionTypes.USER_FAILED, error });
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
