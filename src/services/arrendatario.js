import axios from "axios";

const url = import.meta.env.VITE_URL_LOCAL;
// const url = import.meta.env.VITE_URL_SERVICE;


export const getAllArrendatarios = async (place) => {
    const res = await axios.get(`${url}/getArrendatarios/${place}`, { withCredentials: true})
    return res;
}

export const createArrendatario = async (body,place) => {
    const result = await axios.post(`${url}/createArrendatario/${place}`, body , { withCredentials: true})
    return result;
}