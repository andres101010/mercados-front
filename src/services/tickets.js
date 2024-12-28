import axios from "axios";

// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;

export const createTickets = async (body) => {

    const res = await axios.post(`${url}/createTickets`, body, {withCredentials: true});
    return res;
}

export const getTickets = async () => {
    const res = await axios.get(`${url}/getTickets`, {withCredentials: true});
    return res;
}

export const editTickets = async (body) => {
    const res = await axios.put(`${url}/editTickets`, body, {withCredentials: true});
    return res;
}

export const deleteTickets = async (id) => {
    const res = await axios.delete(`${url}/deleteTickets/${id}`, {withCredentials: true});
    return res;
}