import React, { useState, useEffect } from 'react';
import canasta from '../../images/canasta.png';
import '../Header/style.css';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons';
import Cookies from 'js-cookie';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import './style.css';

export const Header = () => {

  const deleteLocalhostCookies = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      // Verificar si la cookie pertenece al dominio "localhost"
      if (cookies.hasOwnProperty(cookie) && Cookies.get(cookie, { domain: 'main--bucolic-meringue-964478.netlify.app' })) {
        Cookies.remove(cookie, { domain: 'main--bucolic-meringue-964478.netlify.app' });
      }
    }
  };


  const isAuthenticated = !!Cookies.get('registro');
  const [itemTotal, setItemTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const infocartCookie = Cookies.get('infocart');
        if (infocartCookie) {
          const infocartData = JSON.parse(infocartCookie);
          const cartId = infocartData['cart id'];
        
          const response = await axiosInstance.get(`/cart?id=${cartId}`);
          const productsCount = response.data.length;
          setItemTotal(productsCount);
        }
   
        
      } catch (error) {
        console.log('Error al obtener el número de productos del carrito:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleLogout = async () => {

    try {
      const token = Cookies.get('token');
      if (token) {
        await axiosInstance.post('/logout');
        deleteLocalhostCookies();
        navigate('/'); // Redirigir a la ruta de inicio
        console.log('Fuera del sistema');
      } else {
        console.log('No se encontró el token de acceso');
      }
    } catch (error) {
      console.log('Error en el logout:', error);
    }
  };

  useEffect(() => {
    const handleAddToCart = () => {
      try {
        const infocartCookie = Cookies.get('infocart');
        if (infocartCookie) {
          const infocartData = JSON.parse(infocartCookie);
          const cartId = infocartData['cart id'];
        
          axiosInstance.get(`/cart?id=${cartId}`)
            .then((response) => {
              const productsCount = response.data.length;
              setItemTotal(productsCount);
            })
            .catch((error) => {
              console.log('Error al obtener el número de productos del carrito:', error);
            });
        }
        
      } catch (error) {
        console.log('Error al obtener el número de productos del carrito:', error);
      }
    };

    // Escucha el evento 'addToCart' personalizado y llama a la función handleAddToCart
    document.addEventListener('addToCart', handleAddToCart);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('addToCart', handleAddToCart);
    };
  }, []);

  const idRoleCookie = Cookies.get('idRole');
  const showAdministrarProductosOption = idRoleCookie === '1';
  const showProductosOption = idRoleCookie === '3';
  const showCartSection = idRoleCookie === '3';

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
          <Link to="/IndexOrders">Ordenes</Link>
        </li>
        {showAdministrarProductosOption && (
          <li>
            <Link to="/IndexProducts">Administrar productos</Link>
          </li>
        )}
        {showProductosOption && (
          <li>
            <Link to="/productos">PRODUCTOS</Link>
          </li>
        )}
        {isAuthenticated ? (
          <li>
            <Link to="/" onClick={handleLogout} style={{ paddingRight: '20px' }}>
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
        {showCartSection && (
          <><box-icon name="cart"></box-icon><span className="item__total">
            <Link to="/mycart">{itemTotal}</Link>
          </span></>
          )}
        </div>
   
    </header>
  );
};
