import axios from "axios";
// import moment from "moment";
// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;

export const getInfoPdf = async (place) => {
    const res = await axios.get(`${url}/${place}/pdf`,{ withCredentials: true})
    return res
}