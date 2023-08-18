import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axiosInstance from "../axiosInstance";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCardText,
  MDBCardTitle,
  MDBBadge,
} from "mdb-react-ui-kit";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";
import SuccessMessage from "../SuccessMessage"; // Importa el componente SuccessMessage
import { Link, useNavigate } from "react-router-dom";

export function ProductsList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [error, setError] = useState(null); // Agrega el estado error
  const [isLoading, setIsLoading] = useState(true); // Agrega el estado isLoading para la pantalla de carga
  const [addingToCart, setAddingToCart] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category");

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
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      queryParams.set("categoria", selectedCategory);
    }
    const path = `${location.pathname}?${queryParams.toString()}`;
    window.history.replaceState(null, "", path);
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.nombre_producto
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.detalle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === "" ||
      product.id_categoria === parseInt(categoryFilter);

    return matchSearch && matchCategory;
  });

  const [inputTouched, setInputTouched] = useState(false); // Nuevo estado para determinar si se ha interactuado con el input

  const addToCart = async (product) => {
    setError(null); // Limpiar el mensaje de error
    setAddingToCart(true); // Mostrar la pantalla de carga
    setIsLoading(true);

    // Verificar si la cantidad seleccionada es válida
    if (
      !inputTouched ||
      product.cantidad === "" ||
      product.cantidad === null ||
      parseInt(product.cantidad) <= 0
    ) {
      setError("Por favor, seleccione una cantidad válida.");
      setIsLoading(false);
      return;
    }

    // Verificar si la cantidad seleccionada supera el stock disponible
    if (parseInt(product.cantidad) > product.stock_number) {
      setError("La cantidad seleccionada supera el stock disponible.");
      setIsLoading(false);
      return;
    }

    const tokenCookie = Cookies.get("token"); // Obtén la cookie "token"

    // Redireccionar a la ventana de registro si no hay token
    if (!tokenCookie) {
      navigate("/register"); // Cambia '/registro' por la ruta de tu ventana de registro
      setIsLoading(false);
      return;
    }

    const cartCookie = Cookies.get("carrito");
    if (!cartCookie) {
      // Crea la cookie "carrito"
      Cookies.set("carrito", "carrito creado");

      // Envía la petición y guarda la respuesta en la cookie "infocart"
      try {
        const idUser = Cookies.get("id_user");

        if (!idUser) {
          console.log("No se encontró el id_user en la cookie");
          return;
        }
        const response = await axiosInstance.post("/cart/create", {
          id_user: parseInt(idUser),
        });
        Cookies.set("infocart", JSON.stringify(response.data));

        // Extrae el ID del carrito de la respuesta
        const cartId = response.data["cart id"];

        // Envía los datos del producto añadido al carrito a la ruta http://127.0.0.1:8000/api/cart/add
        const addProductResponse = await axiosInstance.post("/cart/add", {
          id_cart: cartId,
          id_producto: product.id,
          cantidad: parseInt(product.cantidad),
        });

        console.log("Producto añadido al carrito:", addProductResponse.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      const infocartCookie = Cookies.get("infocart");
      let cartId;

      try {
        // Extrae el ID del carrito de la respuesta
        const infocartData = JSON.parse(infocartCookie);
        cartId = infocartData["cart id"];

        // Envía los datos del producto añadido al carrito a la ruta http://127.0.0.1:8000/api/cart/add
        const addProductResponse = await axiosInstance.post("/cart/add", {
          id_cart: cartId,
          id_producto: product.id,
          cantidad: parseInt(product.cantidad),
        });

        console.log("Producto añadido al carrito:", addProductResponse.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    // Aquí puedes implementar la lógica para agregar el producto al carrito de compras
    console.log("Añadir al carrito:", product);

    // Emitir el evento personalizado 'addToCart'
    document.dispatchEvent(new Event("addToCart"));
  };

  return (
    <MDBContainer
      fluid
      className="Products text-center"
      style={{ marginTop: "145px" }}
    >
      {isLoading ? (
        // Pantalla de carga mientras isLoading es true
        <div className="text-center" style={{ paddingTop: "150px" }}>
          Cargando...
        </div>
      ) : (
        // Contenido normal de la página cuando isLoading es false
        <>
          <h1 className="title" style={{ paddingBottom: "50px" }}>
            Catalogo
          </h1>

          <MDBRow>
            <MDBCol md="6" className="mb-4">
              <MDBInput
                type="text"
                label="Buscar"
                value={searchTerm}
                onChange={handleSearch}
              />
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
                <div
          style={{

            justifyContent: "center",
            alignItems: "center",
            height: "200px", // Tamaño fijo para el contenedor de la imagen
            marginBottom: "10px", // Espacio entre las imágenes
            overflow: "hidden", // Ocultar partes de la imagen que excedan el contenedor
          }}
        >
                    {/* Carrusel de imágenes */}
                    <Carousel
                      showArrows={true}
                      infiniteLoop={true}
                      showStatus={false}
                    >
                      {product.images.map((image) => (
                        <div key={image.id}>
                          <img
                            src={image.cloudinary_url}
                            alt={`Imagen ${image.id}`}
                            style={{ maxWidth: "200px", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <MDBCardBody>
                    <MDBCardTitle>
                      <a href="#!" className="text-reset text-decoration-none">
                        {product.nombre_producto}
                      </a>
                    </MDBCardTitle>
                    <MDBCardText>{product.detalle}</MDBCardText>
                    <h6 className="mb-3">${product.valor_venta}</h6>
                    <h6 className="mb-3">
                      Stock disponible:{" "}
                      <MDBBadge
                        bg={product.stock_number > 0 ? "success" : "danger"}
                      >
                        {product.stock_number}
                      </MDBBadge>
                    </h6>

                    <div className="d-flex flex-column">
                      <div className="mb-3">
                        <MDBInput
                          type="number"
                          min="1"
                          label="Cantidad"
                          max={product.stock_number}
                          onChange={(e) => {
                            // Solo actualizar el valor si la entrada no contiene "+" o "-"
                            if (
                              !e.target.value.includes("+") &&
                              !e.target.value.includes("-")
                            ) {
                              product.cantidad = e.target.value;
                            }
                          }}
                          onFocus={() => setInputTouched(true)} // Actualizar el estado al interactuar con el input
                          onKeyDown={(e) => {
                            // Evitar que se ingrese el signo "+" o "-"
                            if (e.key === "+" || e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>

                      <MDBBtn
                        color="success"
                        onClick={() => addToCart(product)}
                      >
                        Añadir al carrito{" "}
                        <MDBIcon icon="cart-plus" className="ms-2" />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>

          {/* Mostrar el componente SuccessMessage si hay un error */}
          {error && (
            <SuccessMessage
              title="Error al agregar al carrito"
              message={error}
              onClose={() => setError(null)} // Limpiar el mensaje de error al cerrar el modal
            />
          )}
        </>
      )}
    </MDBContainer>
  );
}

export default ProductsList;
