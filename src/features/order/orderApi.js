import axios from "axios";
let baseUrl="https://kenzisserver.onrender.com/api/orders";

//menager,2 newComponant, (one list)
const getAllOrders=()=>{
    return axios.get(`${baseUrl}`);
}

const getAllOrdersOfUser=(id)=>{
    return axios.get(`${baseUrl}/:id`);
}
//for user-toBuy
const addOrder=(order,userToken)=>{
    return axios.post(baseUrl,order,
        {headers:{
            "user-token":userToken
        },
        });
}
//maneger,newPage
const updateOrderStatus=(id)=>{
    return axios.put(`${baseUrl}/id`);
}

//maneger,
const deleteOrder=(id)=>{
    return axios.delete(`${baseUrl}/id`)
}
export{getAllOrders,getAllOrdersOfUser,addOrder,updateOrderStatus,deleteOrder};