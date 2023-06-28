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

export function CreateProducts() {
  const [formData, setFormData] = useState({
    id_categoria: "",
    nombre: "",
    detalle: "",
    stock: "",
    valor: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedValor = parseFloat(formData.valor).toFixed(2);
      await axios.post("http://127.0.0.1:8000/api/products/store", {
        id_categoria: parseInt(formData.id_categoria),
        nombre: formData.nombre,
        detalle: formData.detalle,
        stock: parseInt(formData.stock),
        valor: formattedValor,
      });
      // Lógica adicional después de crear el producto
      console.log("Producto creado:", formData);
      setFormData({
        id_categoria: "",
        nombre: "",
        detalle: "",
        stock: "",
        valor: "",
      });
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
        <MDBBtn type="submit">Crear Producto</MDBBtn>
      </form>
    </MDBContainer>
  );
}

export default CreateProducts;
