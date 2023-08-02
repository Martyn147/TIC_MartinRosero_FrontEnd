import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import './style.css';
import { Link } from 'react-router-dom';
export const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
  });

  // Estado para almacenar los pedidos
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Realiza la petición GET a la ruta "/profile"
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setProfileData(response.data[0]);
        setEditedProfile(response.data[0]);
      } catch (error) {
        console.log('Error al obtener los datos del perfil:', error);
      }
    };

    // Realiza la petición GET a la ruta "/orders/client/list" para obtener los pedidos
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders/client/list');
        setOrders(response.data);
      } catch (error) {
        console.log('Error al obtener los pedidos:', error);
      }
    };

    fetchProfileData();
    fetchOrders();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProfile((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!editedProfile.nombres || !editedProfile.apellidos || !editedProfile.telefono || !editedProfile.direccion) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    try {
      const requestData = {
        nombres: editedProfile.nombres,
        apellidos: editedProfile.apellidos,
        telefono: editedProfile.telefono,
        direccion: editedProfile.direccion,
      };

      await axiosInstance.post('/profile/update', requestData);
      setProfileData(editedProfile);
      setEditMode(false);
    } catch (error) {
      console.log('Error al guardar los cambios del perfil:', error);
    }
  };

  return (
    <MDBContainer fluid className="profile my-5">
      <h4 className="mb-4">
        <strong>Mi Perfil</strong>
      </h4>
      <MDBRow className="justify-content-center pt-5">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              {!editMode ? (
                <>
                  <h5 className="mb-4">{`${profileData?.nombres} ${profileData?.apellidos}`}</h5>
                  <p className="mb-2">
                    <MDBIcon icon="phone" className="me-2" />
                    Teléfono: {profileData?.telefono}
                  </p>
                  {profileData?.direccion && (
                    <p>
                      <MDBIcon icon="map-marker-alt" className="me-2" />
                      Dirección: {profileData.direccion}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <MDBInput
                    type="text"
                    label="Nombres"
                    name="nombres"
                    value={editedProfile.nombres}
                    onChange={handleInputChange}
                    className="my-4"
                    required
                    validation="complete"
                    validationMessage="Completa este campo"
                  />
                  <MDBInput
                    type="text"
                    label="Apellidos"
                    name="apellidos"
                    value={editedProfile.apellidos}
                    onChange={handleInputChange}
                    className="my-4"
                    required
                    validation="complete"
                    validationMessage="Completa este campo"
                  />
                  <MDBInput
                    type="text"
                    label="Teléfono"
                    name="telefono"
                    value={editedProfile.telefono}
                    onChange={handleInputChange}
                    className="my-4"
                    required
                    validation="complete"
                    validationMessage="Completa este campo"
                  />
                  <MDBInput
                    type="text"
                    label="Dirección"
                    name="direccion"
                    value={editedProfile.direccion || ''}
                    onChange={handleInputChange}
                    className="my-4"
                    required
                    validation="complete"
                    validationMessage="Completa este campo"
                  />
                </>
              )}

              <div className="d-flex justify-content-between">
                {!editMode ? (
                  <MDBBtn onClick={handleEditClick} floating>
                    <MDBIcon icon="edit" />
                  </MDBBtn>
                ) : (
                  <div className="d-flex my-4">
                    <MDBBtn color="danger" onClick={() => setEditMode(false)}>Cancelar</MDBBtn>
                    <MDBBtn color="success" onClick={handleSaveChanges} className="ms-2">Guardar Cambios</MDBBtn>
                  </div>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      {/* Sección para ver los pedidos */}
      <MDBRow className="justify-content-center mt-5">
      <MDBCol md="6">
        <h5>Mis Pedidos</h5>
        {Array.isArray(orders) && orders.length > 0 ? ( // Verificamos si orders es un array y si no está vacío
          <MDBListGroup>
            {orders.map((order) => (
              <MDBListGroupItem key={order.id}>
              <strong>Nombre:</strong> {order.nombres} {order.apellidos}
              <br />
              <strong>Dirección:</strong> {order.direccion}
              <br />
              <strong>Valor Total:</strong> {order.valor_total}
              <br />
              <strong>Modo de Pago:</strong> {order.modo_pago}
              <br />
              <strong>Estado:</strong> {order.estado}
              <br />
                  <Link to={`/MiPedido/${order.id}`}>
                    <MDBBtn color="primary" className="my-2">
                      Detalles del pedido
                    </MDBBtn>
                  </Link>
                </MDBListGroupItem>
            ))}
          </MDBListGroup>
        ) : (
          <p>No hay pedidos disponibles.</p>
        )}
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
};



export default Profile;
