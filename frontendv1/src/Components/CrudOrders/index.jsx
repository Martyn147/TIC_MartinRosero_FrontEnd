import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBInputGroup,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";
import "./style.css";

import axiosInstance from '../axiosInstance';

export function CrudOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [formData, setFormData] = useState({
    keyword: "",
    category: "",
    status: "", // Nuevo campo para filtrar por estado
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [formData.keyword, formData.category, formData.status, orders]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders/list');
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (formData.keyword) {
      filtered = filtered.filter((order) =>
        order.nombres
          .toLowerCase()
          .includes(formData.keyword.toLowerCase())
      );
    }

    if (formData.category) {
      filtered = filtered.filter(
        (order) => order.id === parseInt(formData.category)
      );
    }

    if (formData.status) {
      filtered = filtered.filter((order) =>
        order.estado.toLowerCase().includes(formData.status.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (id) => {
    // Handle edit logic here
    navigate(`/EditOrder?id=${id}`);
    console.log("Edit order:", id);
  };

  const handleDelete = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const data = { id_user: orderToDelete.id };
      await axiosInstance.delete("/orders/delete", {
        data: data,
      });
      fetchOrders();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const statuses = [
    { value: "", text: "Todos los Estados" },
    { value: "pendiente", text: "Pendiente" },
    { value: "entregado", text: "Entregado" },
  ];

  return (
    <MDBContainer className="crud-list">
      <h1>Administracion de Pedidos</h1>

      <MDBRow className="lista pt-3">
        <MDBCol md="6" className="mb-4">
          <MDBInput
            type="text"
            name="keyword"
            label="Buscar"
            placeholder="Search by name"
            value={formData.keyword}
            onChange={handleInputChange}
          />
        </MDBCol>

        <MDBCol md="6" className="mb-4">
          <select
            name="status"
            className="form-select mb-3"
            aria-label="Status"
            value={formData.status}
            onChange={handleInputChange}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.text}
              </option>
            ))}
          </select>
        </MDBCol>
      </MDBRow>

      <Link to="/CreateOrder" className="btn btn-primary mb-4">
        Añadir Pedido
      </Link>

      <MDBTable responsive>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Nombres</th>
              <th className="text-center">Apellidos</th>
              <th className="text-center">Direccion</th>
              <th className="text-center">Valor Total</th>
              <th className="text-center">Modo de Pago</th>
              <th className="text-center">Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="text-center">{order.id}</td>
                <td className="text-center">{order.nombres}</td>
                <td className="text-center">{order.apellidos}</td>
                <td className="text-center">{order.direccion}</td>
                <td className="text-center">{order.valor_total}</td>
                <td className="text-center">{order.modo_pago}</td>
                <td className="text-center">{order.estado}</td>
                <td className="text-center">
                  <MDBBtn size="sm" onClick={() => handleEdit(order.id)}>
                    Editar
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    onClick={() => handleDelete(order)}
                    className="ms-2"
                    color="danger"
                  >
                    Eliminar
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBTable>

      <MDBModal
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>Eliminar Pedido</MDBModalHeader>
            <MDBModalBody>
              <p>El siguiente pedido será eliminado en su totalidad</p>
              {orderToDelete && (
                <div>
                  <p>ID: {orderToDelete.id}</p>
                  <p>Nombres: {orderToDelete.nombres}</p>
                </div>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
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
}

export default CrudOrders;
