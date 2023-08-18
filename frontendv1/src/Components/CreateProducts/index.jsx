import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./style.css";
import axiosInstance from '../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import SuccessMessage from '../SuccessMessage'; // Importa el componente SuccessMessage


export function CreateProducts() {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar la visibilidad del mensaje


  const [formData, setFormData] = useState({
    id_categoria: "",
    nombre: "",
    detalle: "",
    stock: "",
    valor: "",
    imagen: null,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      imagen: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedValor = parseFloat(formData.valor).toFixed(2);
      const productData = new FormData(); // Usar FormData para enviar la imagen
      productData.append("id_categoria", formData.id_categoria);
      productData.append("nombre", formData.nombre);
      productData.append("detalle", formData.detalle);
      productData.append("stock", formData.stock);
      productData.append("valor", formattedValor);
      productData.append("file", formData.imagen);

      const response = await axiosInstance.post("/products/store", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        const productId = response.data.product_id;
        console.log("Producto creado con ID:", productId);

        // Aquí puedes realizar cualquier lógica adicional después de crear el producto
        // ...

        setFormData({
          id_categoria: "",
          nombre: "",
          detalle: "",
          stock: "",
          valor: "",
          imagen: null,
        });
        setShowSuccessMessage(true); // Mostrar el mensaje de éxito
        setTimeout(() => {
          setShowSuccessMessage(false); // Ocultar el mensaje después de un tiempo
          navigate("/IndexProducts"); // Redirigir después de ocultar el mensaje
        }, 3000); // Ocultar el mensaje después de 3 segundos
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    { value: "", text: "Selecciona una categoría" },
    { value: "1", text: "Alimentos" },
    { value: "2", text: "Limpieza" },
    { value: "3", text: "Tecnología" },
  ];

  return (
    <MDBContainer className="create-product">
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <MDBRow className="mb-3">
          <MDBCol>
            <select
              name="id_categoria"
              className="form-select"
              value={formData.id_categoria}
              onChange={handleInputChange}
              required
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.text}
                </option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="text"
              label="Nombre del Producto"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="textarea"
              label="Detalle"
              name="detalle"
              value={formData.detalle}
              onChange={handleInputChange}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="number"
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="number"
              label="Valor de Venta"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit">Crear Producto</MDBBtn>
      </form>
    {/* Mostrar el componente SuccessMessage si showSuccessMessage es true */}
    {showSuccessMessage && (
        <SuccessMessage
          title="Producto creado exitosamente"
          message="El producto ha sido creado con éxito."
          onClose={() => setShowSuccessMessage(false)} // Ocultar el mensaje al cerrar
        />
      )}
    </MDBContainer>
  );
}

export default CreateProducts;
