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

import axiosInstance from "../axiosInstance";
import Pagination from "../Pagination";

export function CrudProducts() {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
  }, [currentPage, formData.keyword, formData.category, products]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
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

    // Update the total pages
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));

    const offset = (currentPage - 1) * itemsPerPage;
    const pagedProducts = filtered.slice(offset, offset + itemsPerPage);
    setFilteredProducts(pagedProducts);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <td className="text-center" style={{ verticalAlign: "middle" }}>{product.id}</td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>{product.id_categoria}</td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>
        {product.images.length > 0 && (
          <img
            src={product.images[0].cloudinary_url}
            alt={product.nombre_producto}
            style={{ width: "100px", height: "auto" }}
          />
        )}
      </td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>{product.nombre_producto}</td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>{product.detalle}</td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>{product.stock_number}</td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>{product.valor_venta}</td>
      <td className="text-center" style={{ verticalAlign: "middle" }}>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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
              <MDBBtn
                color="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
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
