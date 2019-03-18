const GET_PRODUCT_PENDING = 'product/GET_PRODUCT_PENDING';
const GET_PRODUCT_SUCCESS = 'product/GET_PRODUCT_SUCCESS';
const GET_PRODUCT = 'product/GET_PRODUCT';
const POST_PRODUCT = 'product/POST_PRODUCT';
const PUT_PRODUCT = 'product/PUT_PRODUCT';
const GET_ID_PRODUCT = 'product/GET_ID_PRODUCT';
const GET_PRODUCT_FAILED = 'product/GET_PRODUCT_FAILED';
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';

const actionTypes = {
    GET_PRODUCT_PENDING,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILED,
    POST_PRODUCT,
    PUT_PRODUCT,
    DELETE_PRODUCT,
    GET_ID_PRODUCT,
    GET_PRODUCT,
};

export default actionTypes;

export const deleteProduct = (payload) => {
    return {
        type: DELETE_PRODUCT,
        payload
    }
};

export const  getProduct = (payload) => {
    return {
        type: GET_PRODUCT,
        payload
    }
}

export const  getIDProduct = (payload) => {
    return {
        type: GET_ID_PRODUCT,
        payload
    }
}

export const  postProduct = (payload) => {
    return {
        type: POST_PRODUCT,
        payload
    }
}

export const  editProduct = (payload) => {
    return {
        type: PUT_PRODUCT,
        payload
    }
}

export const getProductSuccess = (payload) => {
    return {
        type: GET_PRODUCT_SUCCESS,
        payload
    }
};
