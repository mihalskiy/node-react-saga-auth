import Immutable from 'seamless-immutable';
import createSagaMiddleware from 'redux-saga';
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import rootReducer from '../reducers/reducer';
import rootSaga from '../sagas/saga';
import state from './initialState';

const sagaMiddleware = createSagaMiddleware();
const windowExist = typeof window === 'object';
const composeEnhancers = (windowExist && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middlewares = [sagaMiddleware];

const getDevEnhancers = () => {
    const { composeWithDevTools } = require('redux-devtools-extension');
     const { logger } = require('redux-logger');
     middlewares.push(logger);

    return composeWithDevTools(applyMiddleware(...middlewares));
};

const getEnhancers = () => (process.env.NODE_ENV !== 'production'
    ? getDevEnhancers(middlewares)
    : composeEnhancers(applyMiddleware(...middlewares)));

const createOneStore = (_initialState = state) => {
    const immutableInitialState = !_initialState.toJS
        ? Immutable(_initialState)
        : { ..._initialState };

    const store = createStore(
        rootReducer(),
        immutableInitialState,
        getEnhancers(),
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

const globalStore = createOneStore();

export {
    createOneStore,
    globalStore,
};
