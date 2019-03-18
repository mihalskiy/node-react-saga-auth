import PortfolioAction from './auth.action';
import initialState from '../store/initialState';

function reducer(state = initialState.auth, action = {}) {
    const { type = '', payload = {} } = action;
    switch (type) {
        case PortfolioAction.USER_CREATE:
            return state.merge({
                loading: true,
                ...payload
            });
        case PortfolioAction.USER_ENTER:
            return state.merge({
                loading: true,
                ...payload
            });
        case PortfolioAction.USER_SUCCESS:
            return state.merge({
                loading: true,
                payload: {
                    isRegister: false,
                    ...payload
                }
        });
        case PortfolioAction.USER_FAILED:
            return state.merge({
                loading: true,
                ...payload
        });
        default:
            return state;
    }
}

export default reducer;
