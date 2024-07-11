import axios from "axios";

let baseUrl = "https://kenzisserver.onrender.com/api/products";
///used
const getAllProducts = (page, perPage, search) => {
    return axios.get(`${baseUrl}?page=${page}&&perPage=${perPage}&&search=${search}`);
}

const getProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

//menager,form
const addProduct = (product, userToken) => {
    return axios.post(baseUrl, product, {
        headers: {
            "user-token": userToken
        }
    });
}
//menager
const deleteProductById = (id, userToken) => {
    return axios.delete(`${baseUrl}/${id}`,
        {
            headers: {
                "user-token": userToken
            }
        });
}
//maneger,form
const updateProduct = (id, product, userToken) => {
    return axios.put(`${baseUrl}/${id}`, product, {
        headers: {
            "user-token": userToken
        }
    })
}
const checkNumOfProduct = () => {
    return axios.get(`${baseUrl}/countProduct`,)
}


export { getAllProducts, getProductById, addProduct, deleteProductById, updateProduct, checkNumOfProduct };
