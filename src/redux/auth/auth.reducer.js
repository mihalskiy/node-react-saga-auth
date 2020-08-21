import actionTypes from './auth.action';
import initialState from '../store/initialState';

function reducer(state = initialState.auth, action = {}) {
    const { type = '', payload = {} } = action;
    switch (type) {
        case actionTypes.USER_CREATE:
            return state.merge({
                loading: true,
                ...payload
            });
        case actionTypes.USER_ENTER:
            return state.merge({
                loading: true,
                ...payload
            });
        case actionTypes.USER_SUCCESS:
            return state.merge({
                loading: true,
                ...payload
        });
        case actionTypes.USER_FAILED:
            return state.merge({
                loading: true,
                ...payload
        });
        default:
            return state;
    }
}

export default reducer;
