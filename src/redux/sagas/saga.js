import { all } from 'redux-saga/effects';
import ProductSaga from '../product/product.saga';
import Auth from '../auth/auth.saga';

export default function* rootSaga() {
    yield all([
        ProductSaga(),
        Auth(),
    ]);
}
