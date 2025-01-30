import axios from "axios";

// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;

export const getHistorial = async (id) =>{
    const resp = await axios.get(`${url}/historial/${id}`,{withCredentials:true})
    return resp
}