import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./style.css";

export const ShopingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [modoPago, setModoPago] = useState("");
  const [showBankAccountInfo, setShowBankAccountInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const infocartCookie = Cookies.get("infocart");
        if (infocartCookie) {
          const infocartData = JSON.parse(infocartCookie);
          const cartId = infocartData["cart id"];
          const response = await axiosInstance.get(`/cart?id=${cartId}`);
          setCartItems(response.data);
        }
      } catch (error) {
        console.log("Error al obtener los elementos del carrito:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDecrementItem = async (itemId) => {
    try {
      const infocartCookie = Cookies.get("infocart");
      if (infocartCookie) {
        const infocartData = JSON.parse(infocartCookie);
        const cartId = infocartData["cart id"];

        // Realiza la petición a la ruta "/cart/remove"
        await axiosInstance.delete("/cart/remove", {
          data: {
            id_cart: cartId,
            id_producto: itemId,
            cantidad: 1, // Decrementar en 1
          },
        });

        // Actualiza los elementos del carrito después de la respuesta exitosa
        const updatedCartItems = cartItems.map((item) => {
          if (item.id_producto === itemId && item.cantidad > 1) {
            const newCantidad = item.cantidad - 1;
            const newSumaPrecio = newCantidad * item.valor_venta;

            return {
              ...item,
              cantidad: newCantidad,
              suma_precio: newSumaPrecio,
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log("Error al decrementar el artículo en el carrito:", error);
    }
  };

  const handleModoPagoChange = (e) => {
    setModoPago(e.target.value);

    // Si la opción seleccionada es "transferencia", mostramos la sección con datos falsos de la cuenta bancaria
    if (e.target.value === "transferencia") {
      setShowBankAccountInfo(true);
    } else {
      setShowBankAccountInfo(false);
    }
  };

  const handleFinalizarCompra = async () => {
    try {
      const response = await axiosInstance.post("/orders/create", {
        modo_pago: modoPago,
      });
      Cookies.remove("carrito");
      Cookies.remove("infocart");
      navigate("/");
      window.location.reload();

      // Realiza cualquier acción adicional después de finalizar la compra, como mostrar un mensaje de éxito, redirigir, etc.
    } catch (error) {
      console.log("Error al finalizar la compra:", error);
    }
  };

  const handleIncrementItem = async (itemId) => {
    try {
      const infocartCookie = Cookies.get("infocart");
      if (infocartCookie) {
        const infocartData = JSON.parse(infocartCookie);
        const cartId = infocartData["cart id"];

        // Realiza la petición a la ruta "/cart/add"
        await axiosInstance.post("/cart/add", {
          id_cart: cartId,
          id_producto: itemId,
          cantidad: 1, // Incrementar en 1
        });

        // Actualiza los elementos del carrito después de la respuesta exitosa
        const updatedCartItems = cartItems.map((item) => {
          if (item.id_producto === itemId) {
            const newCantidad = item.cantidad + 1;
            const newSumaPrecio = newCantidad * item.valor_venta;

            return {
              ...item,
              cantidad: newCantidad,
              suma_precio: newSumaPrecio,
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log("Error al incrementar el artículo en el carrito:", error);
    }
  };

  const totalAPagar = cartItems.reduce((total, item) => total + item.suma_precio, 0);

  const localFalso = {
    nombre: "Nombre del Local Falso",
    direccion: "Dirección Falsa, Calle Falsa 123",
    descripcion: "Descripción del Local Falso, lugar imaginario para entrega x paga.",
  };

  return (
    <MDBContainer className="shoping-cart">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard>
            <MDBCardHeader className="text-center">
              Carrito de compras
            </MDBCardHeader>
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
                              <MDBTypography variant="h6">
                                {item.nombre_producto}
                              </MDBTypography>
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
                                  onClick={() =>
                                    handleIncrementItem(item.id_producto)
                                  }
                                >
                                  <MDBIcon icon="plus" />
                                </MDBBtn>
                                <MDBBtn
                                  color="danger"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() =>
                                    handleDecrementItem(item.id_producto)
                                  }
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
          <MDBCard className="mt-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="4">
                  <label htmlFor="modoPago" className="form-label">
                    Método de Pago
                  </label>
                  <select
                    className="form-select"
                    id="modoPago"
                    value={modoPago}
                    onChange={handleModoPagoChange}
                  >
                    <option value="">Seleccionar método de pago</option>
                    <option value="PCE">Entrega x paga</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </MDBCol>
              </MDBRow>
              {modoPago === "PCE" && (
                <>
                  <MDBRow className="mt-3">
                    <MDBCol>
                      <MDBTypography variant="h6">
                        Datos del Local:
                      </MDBTypography>
                      <p>Nombre: {localFalso.nombre}</p>
                      <p>Dirección: {localFalso.direccion}</p>
                      <p>Descripción: {localFalso.descripcion}</p>
                    </MDBCol>
                  </MDBRow>
                </>
              )}
              {modoPago === "transferencia" && showBankAccountInfo && (
                <MDBRow className="mt-3">
                  <MDBCol>
                    <MDBCard>
                      <MDBCardBody>
                        <MDBTypography variant="h6">
                          Datos Bancarios:
                        </MDBTypography>
                        <p>Banco: Banco Ficticio</p>
                        <p>Número de cuenta: 1234567890</p>
                        <p>Nombre del titular: Titular Ficticio</p>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              )}
              {modoPago && (
                <MDBRow className="mt-3">
                  <MDBCol>
                    <MDBTypography variant="h6">
                      Total a pagar: ${totalAPagar}
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>
              )}
              <MDBRow className="mt-3">
                <MDBCol>
                  <MDBBtn color="primary" onClick={handleFinalizarCompra}>
                    Finalizar Compra
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ShopingCart;
