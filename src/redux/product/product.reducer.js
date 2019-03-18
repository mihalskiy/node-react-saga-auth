import Immutable from 'seamless-immutable';

import TableAction from './product.action';
import initialState from '../store/initialState';

export const INITIAL_STATE = Immutable(initialState.product);

function reducer(state = INITIAL_STATE, action = {}) {
    const { type = '', payload = {} } = action;
    switch (type) {
        case TableAction.GET_PRODUCT_PENDING :
            return state.merge({
                loading: true,
            });
        case TableAction.GET_PRODUCT_SUCCESS :
            return state.merge({
                loading: false,
                ...payload
            });
        case TableAction.GET_PRODUCT :
            return state.merge({
                loading: false,
                ...payload
            });
        default:
            return state;
    }
}

export default reducer;
