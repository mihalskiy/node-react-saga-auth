const apiInsertNewUser =  process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/sign-up' : 'http://localhost:8080/sign-up';
const apiEnterUser =  process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/sign-in' :'http://localhost:8080/sign-in';

function* insertNewUser(payload) {
    let response =  fetch(apiInsertNewUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.payload)
        })
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            if(data.token) {
                localStorage.clear()
                localStorage.setItem('token', data.token)
            }
        })
        .catch((e) => {
            localStorage.clear()
            console.error(`Error is : ${e}`);
        })
    yield console.log(`response = ${JSON.stringify(response)}`);
    return yield response;
}

function* loginUser(payload) {
    try {
        let response =  fetch(apiEnterUser, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.payload.payload)
        })
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            if(data.token) {
                localStorage.clear()
                localStorage.setItem('token', data.token)
                localStorage.setItem('isAuth', data.auth)
                document.location.reload(true);
                window.location.replace( '/product');
            }
        })
        .catch((e) => {
            localStorage.clear()
            console.error(`Error is : ${e}`);
        })
        yield console.log(`response = ${JSON.stringify(response)}`);
        return yield response;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

export const Api = {
    insertNewUser,
    loginUser
};
