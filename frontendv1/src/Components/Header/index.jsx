import React from 'react';
import canasta from '../../images/canasta.png';
import '../Header/style.css';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons';
import Cookies from 'js-cookie';
import axios from 'axios';

export const Header = () => {
  const isAuthenticated = !!Cookies.get('registro');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = Cookies.get('registro');
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        await axios.post('http://127.0.0.1:8000/api/logout', null, { headers });
        Cookies.remove('registro'); // Eliminar la cookie después de cerrar sesión correctamente
        navigate('/'); // Redirigir a la ruta de inicio
      } else {
        console.log('No se encontró el token de acceso');
      }
    } catch (error) {
      console.log('Error en el logout:', error);
    }
  };

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={canasta} alt="logo" width="90" />
        </div>
      </Link>

      <ul>
        <li>
          <Link to="/">INICIO</Link>
        </li>
        <li>
          <Link to="/productos">PRODUCTOS</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to="/" onClick={handleLogout}>
              SALIR
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">INGRESAR</Link>
            </li>
            <li>
              <Link to="/register">REGISTRATE</Link>
            </li>
          </>
        )}
      </ul>
      <div className="cart">
        <box-icon name="cart"></box-icon>
        <span className="item__total">0</span>
      </div>
    </header>
  );
};
