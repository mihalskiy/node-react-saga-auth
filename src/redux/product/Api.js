const apiGetProducts =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/orders' : 'http://localhost:8080/orders';
const apiCreateProduct =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/order' :'http://localhost:8080/order';
const apiUpadeteProduct =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/order' : 'http://localhost:8080/order';
const apiDestroyProduct =  process.env.PUBLIC_URL ?  process.env.PUBLIC_URL + '/order/destroy' : 'http://localhost:8080/order/destroy';

const insertNewProduct = payload => {
    return  fetch(apiCreateProduct, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload.payload)
    });
};

const updateProduct = payload => {
    return  fetch(apiUpadeteProduct + '/' + payload.data.id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(payload.data.data)
    });
}

const deleteProduct = payload => {
    debugger
    return fetch(apiDestroyProduct + '/' + payload.payload, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
}

 const getByIdProduct = async payload => {
     return  await fetch(apiUpadeteProduct + '/' + payload.payload.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
}

const getProducts = async () => {
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
        return await response.status === 200 ? response.json() : ['null'];

    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}


export const Api = {
    getProducts,
    updateProduct,
    insertNewProduct,
    getByIdProduct,
    deleteProduct,
};
