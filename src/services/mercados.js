import axios from "axios";

// const url = import.meta.env.VITE_URL_LOCAL;
const url = import.meta.env.VITE_URL_SERVICE;


export const getMercados = async () => {
    const result = await axios.get(`${url}/allMercados`)
    return result
}

// export const createMercado = async (body) => {
//     const res = await axios.post(`${url}/createMercado`, body, {
//         withCredentials: true // Permite enviar cookies en la solicitud
//       })
//     return res
// }

export const createMercado = async (body) => {
    const res = await axios.post(`${url}/createMercado`, body, {
      withCredentials: true // Permite el envío de cookies desde el frontend
    });
    return res;
  };

export const editMercado = async (body, id) => {
  const res = await axios.put(`${url}/editMercado/${id}`, body, {withCredentials : true});
  return res;
};

export const deleteMercado = async (id) => {
  const res = await axios.delete(`${url}/deleteMercado/${id}`, {withCredentials : true});
  return res;
}