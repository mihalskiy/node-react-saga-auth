import { put, takeLatest, all } from 'redux-saga/effects';
import {getProductSuccess} from './product.action';
import actionTypes from "./product.action";
import {Api} from "../product/Api";

function* getProductSaga() {
    try {
        const result = yield Api.getProducts();

        if (result) {
            yield put(getProductSuccess({
                result
            }));
        }

    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* postProductSaga(payload) {
    try {
        const result = yield Api.insertNewProduct(payload);
        if (result.ok) {
            yield put({ type: actionTypes.GET_PRODUCT });
        }
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* editProductSaga(payload) {
    try {
        const result = yield Api.updateProduct(payload);
        if (result.ok) {
            yield put({ type: actionTypes.GET_PRODUCT });
        }
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* deleteProductSaga(payload) {
    try {
        const result = yield Api.deleteProduct(payload);
        if (result.ok) {
            yield put({ type: actionTypes.GET_PRODUCT });
        }
    } catch (e) {
        yield put({ type: actionTypes.GET_PRODUCT_FAILED, e });
        console.error(`Error is : ${e}`);
    }
}

function* getByIdProductSaga(payload) {
    try {
        const result = yield Api.getByIdProduct(payload);
        if (result.ok) {
            document.location.reload(true);
            yield put(getProductSuccess({
                result
            }));
        }
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
