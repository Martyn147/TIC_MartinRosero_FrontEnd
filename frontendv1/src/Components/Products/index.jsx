import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../axiosInstance';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.css';

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
  }, [categoryParam]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
    updateURLParams(selectedCategory);
  };

  const updateURLParams = (selectedCategory) => {
    const queryParams = new URLSearchParams();
    if (selectedCategory) {
      queryParams.set('categoria', selectedCategory);
    }
    const path = `${location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, '', path);
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.detalle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === '' || product.id_categoria === parseInt(categoryFilter);

    return matchSearch && matchCategory;
  });

  const addToCart = async (product) => {
    // Verificar si la cantidad seleccionada supera el stock disponible
    if (parseInt(product.cantidad) > product.stock_number) {
      console.log('La cantidad seleccionada supera el stock disponible');
      return;
    }

    const tokenCookie = Cookies.get('token'); // Obtén la cookie "token"

    // Redireccionar a la ventana de registro si no hay token
    if (!tokenCookie) {
      window.location.href = '/register'; // Cambia '/registro' por la ruta de tu ventana de registro
      return;
    }

    const cartCookie = Cookies.get('carrito');
    if (!cartCookie) {
      // Crea la cookie "carrito"
      Cookies.set('carrito', 'carrito creado');

      // Envía la petición y guarda la respuesta en la cookie "infocart"
      try {
        const idUser = Cookies.get('id_user');

        if (!idUser) {
          console.log('No se encontró el id_user en la cookie');
          return;
        }
        const response = await axiosInstance.post('/cart/create', {
          id_user: parseInt(idUser),
        });
        Cookies.set('infocart', JSON.stringify(response.data));

        // Extrae el ID del carrito de la respuesta
        const cartId = response.data['cart id'];

        // Envía los datos del producto añadido al carrito a la ruta http://127.0.0.1:8000/api/cart/add
        const addProductResponse = await axiosInstance.post('/cart/add', {
          id_cart: cartId,
          id_producto: product.id,
          cantidad: parseInt(product.cantidad),
        });

        console.log('Producto añadido al carrito:', addProductResponse.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      const infocartCookie = Cookies.get('infocart');
      let cartId;

      try {
        // Extrae el ID del carrito de la respuesta
        const infocartData = JSON.parse(infocartCookie);
        cartId = infocartData['cart id'];

        // Envía los datos del producto añadido al carrito a la ruta http://127.0.0.1:8000/api/cart/add
        const addProductResponse = await axiosInstance.post('/cart/add', {
          id_cart: cartId,
          id_producto: product.id,
          cantidad: parseInt(product.cantidad),
        });

        console.log('Producto añadido al carrito:', addProductResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    // Aquí puedes implementar la lógica para agregar el producto al carrito de compras
    console.log('Añadir al carrito:', product);

    // Emitir el evento personalizado 'addToCart'
    document.dispatchEvent(new Event('addToCart'));
  };

  return (
    <MDBContainer fluid className="Products my-5 text-center">
      <h4 className="mt-4 mb-5">
        <strong>Bestsellers</strong>
      </h4>

      <MDBRow>
        <MDBCol md="6" className="mb-4">
          <MDBInput type="text" label="Buscar" value={searchTerm} onChange={handleSearch} />
        </MDBCol>

        <MDBCol md="6" className="mb-4">
          <select
            className="form-select"
            aria-label="Category"
            value={categoryFilter}
            onChange={handleCategoryFilter}
          >
            <option value="">Todas las Categorias</option>
            <option value="1">Alimentos</option>
            <option value="2">Limpieza</option>
            <option value="3">Tecnologia</option>
          </select>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        {filteredProducts.map((product) => (
          <MDBCol md="12" lg="4" className="mb-4" key={product.id}>
            <MDBCard>
              {/* Carrusel de imágenes */}
              <Carousel showArrows={true} infiniteLoop={true}>
                {product.images.map((image) => (
                  <div key={image.id}>
                    <img
                      src={image.cloudinary_url}
                      alt={`Imagen ${image.id}`}
                      style={{ maxWidth: '200px', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </Carousel>

              <MDBCardBody>
                <a href="#!" className="text-reset">
                  <h5 className="card-title mb-3">{product.nombre_producto}</h5>
                  <h6 className="mb-3">{product.detalle}</h6>
                </a>
                <h6 className="mb-3">${product.valor_venta}</h6>

                <div className="d-flex justify-content-between align-items-center">
                  <MDBInput
                    type="number"
                    min="1"
                    max={product.stock_number}
                    label="Cantidad"
                    value={product.cantidad}
                    onChange={(e) => {
                      product.cantidad = e.target.value;
                    }}
                  />
                  <MDBBtn color="success" onClick={() => addToCart(product)}>
                    Añadir al carrito
                    <MDBIcon icon="cart-plus" className="ms-2" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default ProductsList;
