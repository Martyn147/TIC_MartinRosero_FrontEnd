import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
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

export function CrudProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState({
    keyword: "",
    category: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [formData.keyword, formData.category, products]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (formData.keyword) {
      filtered = filtered.filter((product) =>
        product.nombre_producto
          .toLowerCase()
          .includes(formData.keyword.toLowerCase())
      );
    }

    if (formData.category) {
      filtered = filtered.filter(
        (product) => product.id_categoria == formData.category
      );
    }

    setFilteredProducts(filtered);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (id) => {
    // Handle edit logic here
    navigate(`/EditProducts?id=${id}`);
    console.log("Edit product:", id);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const data = { id: productToDelete.id };
      await axiosInstance.delete("/products/delete", {
        data: data,
      });
      fetchProducts();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const categories = [
    { value: "", text: "Categorias" },
    { value: "1", text: "Alimentos" },
    { value: "2", text: "Limpieza" },
    { value: "3", text: "Tecnologia" },
  ];

  return (
    <MDBContainer className="crud-list">
      <h1>Administracion de Productos</h1>

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
            name="category"
            className="form-select mb-3"
            aria-label="Category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Todas las Categorias</option>
            <option value="1">Alimentos</option>
            <option value="2">Limpieza</option>
            <option value="3">Tecnologia</option>
          </select>
        </MDBCol>
      </MDBRow>

      <Link to="/CreateProduct" className="btn btn-primary mb-4">
        Añadir Producto
      </Link>

      <MDBTable responsive>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Category ID</th>
              <th className="text-center">Image</th>
              <th className="text-center">Name</th>
              <th className="text-center">Detail</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Value</th>
              <th className="text-center">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="text-center">{product.id}</td>
                <td className="text-center">{product.id_categoria}</td>
                <td className="text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                    alt={product.nombre_producto}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td className="text-center">{product.nombre_producto}</td>
                <td className="text-center">{product.detalle}</td>
                <td className="text-center">{product.stock_number}</td>
                <td className="text-center">{product.valor_venta}</td>
                <td className="text-center">
                  <MDBBtn size="sm" onClick={() => handleEdit(product.id)}>
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    onClick={() => handleDelete(product)}
                    className="ms-2"
                    color="danger"
                  >
                    Delete
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

          <MDBModalHeader>Eliminar Producto</MDBModalHeader>
        <MDBModalBody>
          <p>El siguiente producto sera eliminado en su totalidad</p>
          {productToDelete && (
            <div>
              <p>ID: {productToDelete.id}</p>
              <p>Nombre: {productToDelete.nombre_producto}</p>
            </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </MDBBtn>
          <MDBBtn color="danger" onClick={confirmDelete}>
            Delete
          </MDBBtn>
        </MDBModalFooter>

          </MDBModalContent>
        </MDBModalDialog>
        
      </MDBModal>
    </MDBContainer>
  );
}

export default CrudProducts;
