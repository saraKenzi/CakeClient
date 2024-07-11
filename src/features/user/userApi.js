import axios from "axios";

let baseUrl=`https://kenzisserver.onrender.com/api/users`;

const loginInServer=(user)=>{
    return axios.post(`${baseUrl}/login`,user);
}

const signUpInServer=(user)=>{
    return axios.post(`${baseUrl}`,user);
}

const passwordRecoveryInServer=(user)=>{
    return axios.put(`${baseUrl},user`)
}
const sendMailForUser=(email)=>{
    return axios.post(`${baseUrl}/mail`,email)
}
// const passwordAuth=()
const getAllUsers=()=>{
    return axios.get(`${baseUrl}`);
}

export{signUpInServer,loginInServer,getAllUsers,passwordRecoveryInServer,sendMailForUser};
