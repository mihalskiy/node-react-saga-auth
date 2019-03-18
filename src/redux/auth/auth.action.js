const USER_CREATE = 'USER_CREATE';
const USER_ENTER = 'USER_ENTER';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_FAILED = 'USER_FAILED';

const actionTypes = {
    USER_CREATE,
    USER_ENTER,
    USER_SUCCESS,
    USER_FAILED
};

export default actionTypes;

export const userCreate = (payload) => {
    return {
        type: USER_CREATE,
        loading: false,
         payload: {
             payload
         }
    }
};

export const userEnter = (payload) => {
    return {
        type: USER_ENTER,
        loading: false,
         payload: {
             payload
         }
    }
};

export const userCreateSuccess = (payload) => {
    return {
        type: USER_SUCCESS,
        loading: false,
         payload: {
             payload
         }
    }
};


export const userCreateFailed = (payload) => {
    return {
        type: USER_FAILED,
        loading: false,
         payload: {
             payload
         }
    }
};
