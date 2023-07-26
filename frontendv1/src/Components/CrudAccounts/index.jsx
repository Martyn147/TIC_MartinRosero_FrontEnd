import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModalDialog, MDBModalContent } from 'mdb-react-ui-kit';
import { Link, useLocation } from 'react-router-dom';
import SuccessMessage from '../SuccessMessage';
import Pagination from '../Pagination';

export const CrudAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Nuevo estado para el mensaje de éxito

  const location = useLocation();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    // Mostrar mensaje de éxito cuando se regrese de la página "/CreateAccount"
    if (location.state && location.state.fromCreateAccount) {
      setSuccessMessage('La cuenta ha sido creada con éxito');
    }
  }, [location]);

  const fetchAccounts = async () => {
    try {
      const response = await axiosInstance.get('/accounts');
      setAccounts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las cuentas:', error);
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
        await axiosInstance.delete('/deleteAccount', {
          data: {
            id_user: accountToDelete.id,
          },
        });

        setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== accountToDelete.id));
        setIsDeleteModalOpen(false);

        // Mostrar mensaje de éxito al eliminar la cuenta
        setSuccessMessage('La cuenta ha sido eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    filterAccounts();
  }, [currentPage, accounts]);

  const filterAccounts = () => {
    const itemsPerPage = 5;
    const totalItems = accounts.length;
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages);

    const offset = (currentPage - 1) * itemsPerPage;
    const pagedAccounts = accounts.slice(offset, offset + itemsPerPage);
    setFilteredAccounts(pagedAccounts);
  };

  const [filteredAccounts, setFilteredAccounts] = useState([]);

  return (
    <MDBContainer className="crud-list">
      <h1>Administración de Cuentas</h1>

      {/* Mostrar mensaje de éxito */}
      {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}

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
              <td colSpan="4" className="text-center">
                Cargando...
              </td>
            </tr>
          ) : filteredAccounts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No hay cuentas disponibles.
              </td>
            </tr>
          ) : (
            filteredAccounts.map((account) => (
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

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
