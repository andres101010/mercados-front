
import axios from "axios";

// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;

export const login = async (body) => {
    // try {
        const res = await axios.post(`${url}/loginUser`, body , { withCredentials: true})
        return res.data;
    // } catch (error) {
    //     console.log("error: ", error);
    //     return error;
    // }
}