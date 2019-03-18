const apiGetProducts =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/orders' : 'http://localhost:8080/orders';
const apiCreateProduct =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/order' :'http://localhost:8080/order';
const apiUpadeteProduct =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/order' : 'http://localhost:8080/order';
const apiDestroyProduct =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/order/destroy' : 'http://localhost:8080/order/destroy';

function* insertNewProduct(payload) {
    debugger
    let response =  fetch(apiCreateProduct, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload.payload)
    });
    yield console.log(`response = ${JSON.stringify(response)}`);
    return yield response;
}

function* updateProduct(payload) {
    let response =  fetch(apiUpadeteProduct + '/' + payload.payload.id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload.payload.data)
    });
    yield console.log(`response = ${JSON.stringify(response)}`);
    return yield response;
}

function* deleteProduct(payload) {
    let response =  fetch(apiDestroyProduct + '/' + payload.payload, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
    yield console.log(`response = ${JSON.stringify(response)}`);
    return yield response;
}

async function getByIdProduct(payload) {
    let response =  fetch(apiUpadeteProduct + '/' + payload.payload.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data
        });

    return await {
        data: response
    }
}

async function getProduct() {
    try {
        let response = await fetch(apiGetProducts, {
            method: 'GET',
            crossDomain: true,
            mode: "cors", // or without this line
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }

        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data
            })

        return await {
            data: response
        }

    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}


export const Api = {
    getProduct,
    updateProduct,
    insertNewProduct,
    getByIdProduct,
    deleteProduct,
};
