import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import canasta from "../../images/canasta.png";
import "./style.css";
import axios from "axios";
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErrors, setServerErrors] = useState({});
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
      setServerErrors({});
    } else if (name === "password") {
      setPassword(value);
      setErrors((prevState) => ({
        ...prevState,
        password: "",
      }));
      setServerErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "El email es obligatorio",
      }));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "El email no es válido",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "La contraseña es obligatoria",
      }));
      isValid = false;
    }

    // Enviar formulario si es válido
    if (isValid) {
      const userData = {
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "https://marketplaceppc.fly.dev/api/login",
          userData
        );
        if (response.status === 200 && response.data.access_token) {
          // El inicio de sesión fue exitoso y se recibió un token de acceso
          console.log("Inicio de sesión exitoso");

          // Establecer cookie con el token de acceso
        
          Cookies.set('token', response.data.access_token, { path: '/' });
          Cookies.set('registro', JSON.stringify(response.data));
          Cookies.set('idRole', response.data.user_role, { path: '/' });
          Cookies.set('id_user', response.data.user_id, { path: '/' });

          
          

          navigate("/"); // Redirigir a la ruta de inicio
          window.location.reload();
        } else {
          // Hubo un error en el inicio de sesión
          console.log("Error en el inicio de sesión");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          setErrors(error.response.data.errors);
          setServerErrors({});
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setServerErrors({ message: error.response.data.error });
          setErrors({});
        } else {
          console.error("Error:", error);
        }
      }
    }
  };

  return (
    <MDBContainer className="my-5 login-container">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5 bd-5 me-5">
            <div className="text-center">
              <Link to="/">
                <img src={canasta} className="login-image" alt="logo" />
              </Link>
              <h4 className="mt-1 mb-5 pb-1 login-title">Inicio de Sesión</h4>
            </div>

            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mt-4"
                label="Correo Electrónico"
                id="form3"
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                validation="required"
                invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <div className="login-error">{errors.email}</div>
              )}

              <MDBInput
                wrapperClass="mt-4"
                label="Contraseña"
                id="form2"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
                validation="required"
                invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <div className="login-error">{errors.password}</div>
              )}
              {serverErrors.message && (
                <div className="login-error">{serverErrors.message}</div>
              )}

              <div className="text-center pt-1 mb-5 pb-1 mt-3">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
                  Ingresar
                </MDBBtn>
                <a className="text-muted" href="#!">
                  ¿Olvidó su Contraseña?
                </a>
              </div>

              <div className="login-link-container">
                <p className="mb-0 login-link-text">Crear una cuenta</p>
                <Link to="/register" className="login-link">
                  <MDBBtn outline className="mx-2" color="danger">
                    Registrarse
                  </MDBBtn>
                </Link>
              </div>
            </form>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5 gradient-custom-2">
          <div className="d-flex flex-column justify-content-center h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-3">PideXAqui</h4>
              <p className="big mb-0">
              La forma rápida y fácil de ordenar lo que necesitas
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
