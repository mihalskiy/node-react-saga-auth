const apiInsertNewUser =  process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/sign-up' : 'http://localhost:8080/sign-up';
const apiEnterUser =  process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/sign-in' :'http://localhost:8080/sign-in';

const insertNewUser = user => {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    };

    const status = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        }
        return Promise.reject(new Error(response.statusText))
    };

    const json = (response) => response.json();

    return fetch(apiInsertNewUser, config)
        .then(status)
        .then(json)
        .catch(error => {
           console.error(`'Request failed', ${error}`)
            throw new Error(error.message)
        })

}

const loginUser = async user => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            };
            const response = await fetch(apiEnterUser, config);
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response.json())
            }
            const result = await response.json();

            return Promise.reject(new Error(result.message))
        } catch (error) {

            return error
        }
};

export const Api = {
    insertNewUser,
    loginUser
};
