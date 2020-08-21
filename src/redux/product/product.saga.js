import {put, takeLatest, all, call} from 'redux-saga/effects';
import {getProductSuccess} from './product.action';
import actionTypes from "./product.action";
import {Api} from "../product/Api";

function* getProductSaga() {
    try {
        const result = yield call(Api.getProducts);
        yield put(getProductSuccess({
            result
        }));

    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* postProductSaga(payload) {
    try {
        yield call(Api.insertNewProduct, payload);
        yield put({ type: actionTypes.GET_PRODUCT });
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* editProductSaga(payload) {
    try {
        yield call(Api.updateProduct, payload);
        yield put({ type: actionTypes.GET_PRODUCT });
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* deleteProductSaga(payload) {
    try {
        yield call(Api.deleteProduct, payload);
        yield put({ type: actionTypes.GET_PRODUCT });
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* getByIdProductSaga(payload) {
    try {
        const result = yield call(Api.getByIdProduct, payload);
        document.location.reload(true);
        yield put(getProductSuccess({
            result
        }));
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* actionWatcher() {
    yield takeLatest(actionTypes.GET_PRODUCT, getProductSaga);
    yield takeLatest(actionTypes.GET_ID_PRODUCT, getByIdProductSaga);
    yield takeLatest(actionTypes.POST_PRODUCT, postProductSaga);
    yield takeLatest(actionTypes.PUT_PRODUCT, editProductSaga);
    yield takeLatest(actionTypes.DELETE_PRODUCT, deleteProductSaga);
}

function* Watcher() {
    yield all([
        actionWatcher()
    ]);
}

export default Watcher;
