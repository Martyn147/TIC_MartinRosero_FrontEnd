import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardImage, MDBCardTitle, MDBCardText, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

export const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    // Realiza la petición get a la ruta "/orders/details" enviando el ID del pedido en el cuerpo de la solicitud
    const fetchOrderDetails = async () => {
        try {
            const productsData = {
                id: parseInt(id),
              };
      
              const response = await axiosInstance.get('/orders/details', {
                params: productsData,
              });
             
          setOrderDetails(response.data);
        } catch (error) {
          console.log('Error al obtener los detalles del pedido:', error);
        }
      };

    fetchOrderDetails();
  }, [id]);

  return (
    <MDBContainer fluid className="Products text-center" style={{ marginTop: '145px', marginBottom: '125px' }}>
      <h1 className="title" style={{ paddingBottom: '50px' }}>
        <strong>Detalles del Pedido</strong>
      </h1>

      {orderDetails.length > 0 ? (
        <MDBRow>
          {orderDetails.map((item) => (
            <MDBCol md="4" key={item.id_producto} className="mb-4">
              <MDBCard>
                <MDBCardImage src={item.cloudinary_url} alt={`Imagen ${item.id_producto}`} top hover zoom style={{ maxWidth: '200px', margin: '0 auto' }} />
                <MDBCardBody className="d-flex flex-column align-items-center">
                  <MDBCardTitle>{item.nombre_producto}</MDBCardTitle>
                  <MDBCardText>Detalle: {item.detalle}</MDBCardText>
                  <MDBCardText>Valor: ${item.valor_venta}</MDBCardText>
                  <MDBCardText>Cantidad: {item.cantidad}</MDBCardText>
                  <MDBCardText>Suma Total: ${item.suma_precio}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <p>No se encontraron detalles para este pedido.</p>
      )}
    </MDBContainer>
  );
};

export default OrderDetails;
