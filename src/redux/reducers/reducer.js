import { combineReducers } from 'redux';
import ProductReducer from '../product/product.reducer';
import AuthReducer from '../auth/auth.reducer';

export default () => combineReducers({
    product: ProductReducer,
    auth: AuthReducer
});
