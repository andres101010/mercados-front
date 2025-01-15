import axios from "axios";

// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;


export const createLocal = async (place) => {
    const resp = await axios.post(`${url}/createLocal/${place}`,{}, {withCredentials : true})
    return resp
}

export const getLocal = async (place) => {
    const response = await axios.get(`${url}/getLocal/${place}`, {withCredentials : true})
    return response
}

export const editLocal = async (body,id) => {
    const result = await axios.put(`${url}/editLocal/${id}`,body, {withCredentials : true})
    return result;
}

export const createObservacion = async (id,body) => {
    const result = await axios.post(`${url}/createObservacion/${id}`,body, {withCredentials : true})
    return result;
}

export const resetLocal = async (id) => {
    const result = await axios.put(`${url}/resetLocal/${id}`,{}, {withCredentials : true})
    return result;
}