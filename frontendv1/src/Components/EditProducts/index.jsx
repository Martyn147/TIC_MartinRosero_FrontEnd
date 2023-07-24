import React, { useState, useEffect } from 'react';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import './style.css';
import axiosInstance from '../axiosInstance';
import { useLocation } from 'react-router-dom';

export function EditProducts({ productId }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProduct = searchParams.get('id'); //ya tiene el valor

  const [formData, setFormData] = useState({
    id_categoria: '',
    nombre: '',
    detalle: '',
    stock: '',
    valor: '',
    imagen: null,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productsData = {
          id: parseInt(idProduct),
        };
  
        const response = await axiosInstance.get("/products/find", { params: productsData });
        const productData = response.data;
  
        setFormData({
          id_categoria: productData.id_categoria.toString(),
          nombre: productData.nombre_producto,
          detalle: productData.detalle,
          stock: productData.stock_number.toString(),
          valor: productData.valor_venta.toString(),
          imagen: null,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProductData();
  }, [idProduct]);

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
      const productData = {
        id: parseInt(idProduct),
        id_categoria: parseInt(formData.id_categoria),
        nombre_producto: formData.nombre,
        detalle: formData.detalle,
        stock_number: parseInt(formData.stock),
        valor_venta: formattedValor,
      };

      const response = await axiosInstance.put(
        "/products/update",
        productData
      );
      if (formData.imagen) {
        const imageData = new FormData();
        imageData.append('file', formData.imagen);
        imageData.append('id_producto', parseInt(idProduct));

        await axiosInstance.post('/image/upload', imageData);
        console.log('Imagen del producto actualizada exitosamente');
      }
      if (response.status === 201) {
        console.log('Producto actualizado con ID:', productId);

        // Aquí puedes realizar cualquier lógica adicional después de actualizar el producto
        // ...



        setFormData({
          id_categoria: '',
          nombre: '',
          detalle: '',
          stock: '',
          valor: '',
          imagen: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    { value: '', text: 'Selecciona una categoría' },
    { value: '1', text: 'Alimentos' },
    { value: '2', text: 'Limpieza' },
    { value: '3', text: 'Tecnología' },
  ];

  return (
    <MDBContainer className="edit-product">
      <h1>Editar Producto</h1>
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
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit">Actualizar Producto</MDBBtn>
      </form>
    </MDBContainer>
  );
}

export default EditProducts;
