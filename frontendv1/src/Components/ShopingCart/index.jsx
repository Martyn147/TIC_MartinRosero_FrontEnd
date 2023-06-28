import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from 'mdb-react-ui-kit';
import './style.css';

export const ShopingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const infocartCookie = Cookies.get('infocart');
        if (infocartCookie) {
          const infocartData = JSON.parse(infocartCookie);
          const cartId = infocartData['cart id'];

          const response = await axios.get(`http://127.0.0.1:8000/api/cart?id=${cartId}`);
          setCartItems(response.data);
        }
      } catch (error) {
        console.log('Error al obtener los elementos del carrito:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id_producto === itemId) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id_producto === itemId && item.cantidad > 1) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <MDBContainer  className='shoping-cart'>
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard>
            <MDBCardHeader className="text-center">Carrito de compras</MDBCardHeader>
            <MDBCardBody>
              {cartItems.length === 0 ? (
                <p>No hay elementos en el carrito.</p>
              ) : (
                <MDBListGroup>
                  {cartItems.map((item) => (
                    <MDBListGroupItem key={item.id_producto}>
                      <MDBRow className="align-items-center">
                        <MDBCol md="3">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                            alt={item.nombre_producto}
                            position="top"
                          />
                        </MDBCol>
                        <MDBCol md="9">
                          <MDBRow>
                            <MDBCol>
                              <MDBTypography variant="h6">{item.nombre_producto}</MDBTypography>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol>
                              <p>Detalle: {item.detalle}</p>
                              <p>Valor de venta: ${item.valor_venta}</p>
                              <p>
                                Cantidad: {item.cantidad}
                                <MDBBtn
                                  color="success"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => handleIncreaseQuantity(item.id_producto)}
                                >
                                  <MDBIcon icon="plus" />
                                </MDBBtn>
                                <MDBBtn
                                  color="danger"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => handleDecreaseQuantity(item.id_producto)}
                                >
                                  <MDBIcon icon="minus" />
                                </MDBBtn>
                              </p>
                              <p>Suma de precio: ${item.suma_precio}</p>
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ShopingCart;
