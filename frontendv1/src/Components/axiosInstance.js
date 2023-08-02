import axios from 'axios';
import Cookies from 'js-cookie';

// Crear instancia de axios con los encabezados comunes
const axiosInstance = axios.create({
  baseURL: 'https://marketplaceppc.fly.dev/api', // Establece la URL base para todas las solicitudes
  headers: {
    common: {
      Authorization: `Bearer ${Cookies.get('token')}`, // Encabezado de autorización común para todas las solicitudes
    },
  },
});

export default axiosInstance;
