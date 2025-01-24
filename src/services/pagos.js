import axios from "axios";
// import moment from "moment";
const url = import.meta.env.VITE_URL_LOCAL;
// const url = import.meta.env.VITE_URL_SERVICE;


export const getPagos = async (id,fechaInicial,fechaFinal,idLocal, idMercado) => {
    // moment.updateLocale("en", { week: { dow: 1 } }); // Establece lunes como primer día de la semana

    // const fechaInicial = moment().startOf("week").format("YYYY-MM-DD"); // Lunes de la semana actual
    // const fechaFinal = moment().endOf("week").format("YYYY-MM-DD"); // Domingo de la semana actual

    const res = await axios.get(`${url}/getPagos/${id}/${idLocal}/${idMercado}`, {
        params: { fechaInicial, fechaFinal },
        withCredentials: true
    });
    return res;
};

export const createPago = async (body) => {
    const response = await axios.post(`${url}/createPagos`,body, {withCredentials:true});
    return response;
}