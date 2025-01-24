import axios from "axios";

// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;


export const findUsers = async () => {
    const result = await axios.get(`${url}/findAllUsers`, {withCredentials: true});
    return result;
}

export const createUser = async (body) => {
    const res = await axios.post(`${url}/createUsers`, body , {withCredentials: true});
    return res;
}

export const editUser = async (body, id) => {
    const res = await axios.put(`${url}/editUser/${id}`, body, { headers: {
        'Content-Type': 'multipart/form-data', // Asegura el encabezado para FormData
    }, withCredentials: true});
    return res;
}