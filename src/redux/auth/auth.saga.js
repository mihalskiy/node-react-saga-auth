import { put, takeLatest, all } from 'redux-saga/effects';
import actionTypes, {userCreateSuccess, userCreateFailed} from "./auth.action";
import {Api} from "./Api";

function* postNewUser(params) {
    const {password, s_password} = params.payload.payload;

    if (password === s_password) {
        yield Api.insertNewUser(params)

        const data = localStorage.getItem('token');

        if (data !== 'undefined') {
            yield put(userCreateSuccess({
                isRegister: true,
            }));
        } else {
            yield put(userCreateFailed({
                isRegister: false,
            }));
        }

    } else {
        yield put({ type: actionTypes.USER_FAILED, confirmPassword: false });
        console.error(`Error is : ${params}`);
    }
}

function* postEnterUser(params) {
    try {
        const result = yield Api.loginUser(params);

        if (result.ok !== undefined) {
            yield put(userCreateSuccess({
                isAuth: result.ok
            }));

            //document.location.reload(true);
            //window.location.replace( '/');
        } else {
            yield put(userCreateFailed({
                isAuth: false
            }));
        }
    } catch (e) {
        yield put({ type: actionTypes.USER_FAILED, e });
        console.error(`Error is : ${e}`);
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
