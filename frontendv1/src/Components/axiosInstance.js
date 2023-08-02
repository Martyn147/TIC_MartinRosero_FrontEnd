import axios from 'axios';
import Cookies from 'js-cookie';

// Crear instancia de axios con los encabezados comunes
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Establece la URL base para todas las solicitudes
  headers: {
    common: {
      Authorization: `Bearer ${Cookies.get('token')}`, // Encabezado de autorización común para todas las solicitudes
    },
  },
});

export default axiosInstance;
