import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBadge,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";

import "boxicons";
import Cookies from "js-cookie";
import axiosInstance from "../axiosInstance";
import canasta from "../../images/canasta.png";
import './style.css';
import SessionTimeout from '../SessionTimeout'; // Importar el componente SessionTimeout

export const Header = () => {
  const deleteAllCookies = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  };

  const isAuthenticated = !!Cookies.get("registro");
  const [itemTotal, setItemTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get(`/cart`);
        const productsCount = response.data.length;
        setItemTotal(productsCount);

        // Verificar si la cookie "carrito" existe
        const carritoCookie = Cookies.get("carrito");
        if (!carritoCookie) {
          // Si no existe, crearla con el valor "carrito creado"
          Cookies.set("carrito", "carrito creado");
        }
      } catch (error) {
        console.log(
          "Error al obtener el número de productos del carrito:",
          error
        );
      }
    };

    fetchCartItems();
  }, []);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await axiosInstance.post("/logout");
        deleteAllCookies();
        navigate("/"); // Redirigir a la ruta de inicio
        console.log("Fuera del sistema");
      } else {
        console.log("No se encontró el token de acceso");
      }
    } catch (error) {
      console.log("Error en el logout:", error);
    }
  };

  useEffect(() => {
    const handleAddToCart = () => {
      try {
        const infocartCookie = Cookies.get("infocart");
        if (infocartCookie) {
          const infocartData = JSON.parse(infocartCookie);
          const cartId = infocartData["cart id"];

          axiosInstance
            .get(`/cart?id=${cartId}`)
            .then((response) => {
              const productsCount = response.data.length;
              setItemTotal(productsCount);
            })
            .catch((error) => {
              console.log(
                "Error al obtener el número de productos del carrito:",
                error
              );
            });
        }
      } catch (error) {
        console.log(
          "Error al obtener el número de productos del carrito:",
          error
        );
      }
    };

    // Escucha el evento 'addToCart' personalizado y llama a la función handleAddToCart
    document.addEventListener("addToCart", handleAddToCart);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener("addToCart", handleAddToCart);
    };
  }, []);

  const idRoleCookie = Cookies.get("idRole");
  const showAdministrarProductosOption = idRoleCookie === "1";
  const showAdministrarCuentasOption =
    idRoleCookie === "0" || idRoleCookie === "1";
  const showProductosOption = idRoleCookie === "3";
  const showCartSection = idRoleCookie === "3";

  // Estado para controlar la visibilidad del menú hamburguesa en pantallas pequeñas
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar la visibilidad del menú hamburguesa
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  // Cerrar el menú cuando el componente se monte
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="white" scrolling fixed="top" >
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <img src={canasta} alt="logo" width="90" />
          </MDBNavbarBrand>

          <MDBNavbarToggler type="button" onClick={toggleMenu}>
            <box-icon name="menu"></box-icon>
          </MDBNavbarToggler>

          <MDBCollapse navbar show={isMenuOpen}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  INICIO
                </Link>
              </li>
              {idRoleCookie === "2" && (
                <li className="nav-item">
                  <Link to="/IndexOrders" className="nav-link">
                    ORDENES
                  </Link>
                </li>
              )}
              {showAdministrarProductosOption && (
                <li className="nav-item">
                  <Link to="/IndexProducts" className="nav-link">
                    ADMINISTRAR PRODUCTOS
                  </Link>
                </li>
              )}
              {showAdministrarCuentasOption && (
                <li className="nav-item">
                  <Link to="/IndexAcontsAdmins" className="nav-link">
                    ADMINISTRAR CUENTAS
                  </Link>
                </li>
              )}
              {showProductosOption && (
                <li className="nav-item">
                  <Link to="/productos" className="nav-link">
                    PRODUCTOS
                  </Link>
                </li>
              )}
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/myProfile" className="nav-link">
                      MI PERFIL
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={handleLogout}>
                      SALIR
                    </Link>
                  </li>
                
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      INGRESAR
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      REGISTRATE
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {showCartSection && (
              <Link to="/mycart">
                <MDBBadge pill color="danger" className="cart-badge">
                  {itemTotal}
                </MDBBadge>
                <span className="cart-icon">
                  <MDBIcon icon="shopping-cart" fas />
                </span>
              </Link>
            )}
          </MDBCollapse>

          
       
                    <SessionTimeout />
               
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default Header;
