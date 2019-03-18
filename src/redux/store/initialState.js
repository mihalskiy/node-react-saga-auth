const initialState = {
    product: {
        loading: false,
        url: '',
        error: false,
    },
    auth: {
        loading: true,
        isAuth: localStorage.getItem('isAuth') ? true : false,
        isRegister: localStorage.getItem('token') ? true : false,
    }
};

export default initialState;
