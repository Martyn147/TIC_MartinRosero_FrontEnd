import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import { Link, useLocation } from "react-router-dom";
import SuccessMessage from '../SuccessMessage';

export const CrudAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Nuevo estado para el mensaje de éxito

  const location = useLocation();

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    // Mostrar mensaje de éxito cuando se regrese de la página "/CreateAccount"
    if (location.state && location.state.fromCreateAccount) {
      setSuccessMessage("La cuenta ha sido creada con éxito");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  }, [location]);

  const fetchAccounts = async () => {
    try {
      const response = await axiosInstance.get("/accounts");
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las cuentas:", error);
      setLoading(false);
    }
  };

  const handleDelete = (account) => {
    setAccountToDelete(account);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (accountToDelete) {
      try {
        await axiosInstance.delete("/deleteAccount", {
          data: {
            id_user: accountToDelete.id
          }
        });

        setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== accountToDelete.id));
        setIsDeleteModalOpen(false);

        setSuccessMessage("La cuenta ha sido eliminada con éxito"); // Mostrar mensaje de éxito al eliminar
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    }
  };

  return (
    <MDBContainer className="crud-list">
      <h1>Administración de Cuentas</h1>

      {/* Mostrar mensaje de éxito */}
      {successMessage && (
        <SuccessMessage message={successMessage} duration={3000} />
      )}

      <Link to="/CreateAccount" className="btn btn-primary mb-4">
        Añadir Cuenta
      </Link>

      <MDBTable responsive>
        <MDBTableHead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Email</th>
            <th className="text-center">Creado el</th>
            <th className="text-center">Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">Cargando...</td>
            </tr>
          ) : accounts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay cuentas disponibles.</td>
            </tr>
          ) : (
            accounts.map((account) => (
              <tr key={account.id}>
                <td className="text-center">{account.id}</td>
                <td className="text-center">{account.email}</td>
                <td className="text-center">{account.created_at}</td>
                <td className="text-center">
                  <MDBBtn color="danger" size="sm" onClick={() => handleDelete(account)}>
                    Eliminar
                  </MDBBtn>
                </td>
              </tr>
            ))
          )}
        </MDBTableBody>
      </MDBTable>

      <MDBModal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>Eliminar Cuenta</MDBModalHeader>
            <MDBModalBody>
              <p>La siguiente cuenta será eliminada. ¿Deseas continuar?</p>
              {accountToDelete && (
                <div>
                  <p>ID: {accountToDelete.id}</p>
                  <p>Email: {accountToDelete.email}</p>
                </div>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </MDBBtn>
              <MDBBtn color="danger" onClick={confirmDelete}>
                Eliminar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default CrudAccounts;
