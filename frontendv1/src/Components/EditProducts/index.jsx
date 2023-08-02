import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';

import './style.css';

export function EditProducts() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idProduct = searchParams.get('id');

  const [formData, setFormData] = useState({
    id_categoria: '',
    nombre: '',
    detalle: '',
    stock: '',
    valor: '',
    imagen: null,
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productsData = {
          id: parseInt(idProduct),
        };

        const response = await axiosInstance.get('/products/find', {
          params: productsData,
        });
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

    const getProductImages = async () => {
      try {
        const response = await axiosInstance.get('/image/show', {
          params: { id_producto: parseInt(idProduct) },
        });
        setImages(response.data[0]); // La respuesta está dentro de un array, así que asignamos el primer elemento a "images"
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
    getProductImages();
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

      const response = await axiosInstance.put('/products/update', productData);
      if (response.status === 201) {
        console.log('Producto actualizado con ID:', idProduct);

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

  const handleDeleteImage = async (imageId) => {
    try {
      const imageToDelete = images.find((image) => image.id === imageId);
      if (!imageToDelete) {
        console.log('Imagen no encontrada');
        return;
      }

      await axiosInstance.delete('/image/delete', {
        data: { cloudinary_id: imageToDelete.cloudinary_public_id },
      });

      console.log('Imagen eliminada con ID:', imageId);

      // Actualizar la lista de imágenes
      const newImages = images.filter((image) => image.id !== imageId);
      setImages(newImages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!formData.imagen) {
        console.log('No se ha seleccionado ninguna imagen');
        return;
      }
  
      const imageData = new FormData();
      imageData.append('file', formData.imagen);
  
      // Enviar el ID del producto como parte de la URL
      await axiosInstance.post(`/image/upload/${idProduct}`, imageData);
  
      console.log('Imagen del producto guardada exitosamente');
  
      // Actualizar la lista de imágenes
      const response = await axiosInstance.get('/image/show', {
        params: { id_producto: parseInt(idProduct) },
      });
      setImages(response.data[0]);
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

        <MDBBtn type="submit">Actualizar Producto</MDBBtn>
      </form>

      <div className="my-4">
        <h2>Editar Imágenes</h2>
        <div className="d-flex">
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
          <MDBBtn color="primary" onClick={handleUploadImage}>
            Guardar Imagen
          </MDBBtn>
        </div>
      </div>

      <MDBRow className="mt-5">
  {images.map((image) => (
    <MDBCol md="4" key={image.id} className="mb-4">
      <MDBCard>
        <MDBCardImage
          src={image.cloudinary_url}
          alt={formData.nombre}
          style={{
            maxWidth: '200px',
            height: '200px',
            objectFit: 'cover',
            margin: '0 auto', // Para centrar horizontalmente
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Para centrar verticalmente
          }}
        />
        <MDBCardBody>
          <MDBCardTitle>{formData.nombre}</MDBCardTitle>
          <MDBCardText>{formData.detalle}</MDBCardText>
          <MDBBtn color="danger" onClick={() => handleDeleteImage(image.id)}>
            <MDBIcon icon="trash" />
          </MDBBtn>
        </MDBCardBody>
        <MDBCardFooter>
          <small className="text-muted">Actualizado: {image.updated_at}</small>
        </MDBCardFooter>
      </MDBCard>
    </MDBCol>
  ))}
</MDBRow>
    </MDBContainer>
  );
}

export default EditProducts;
