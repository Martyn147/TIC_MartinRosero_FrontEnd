import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import canasta from "../../images/canasta.png";
import "./style.css";


export const Register = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombres, apellidos, email, telefono, password, password_confirmation } = formData;

    const errors = {};

    if (nombres.trim() === "") {
      errors.nombres = "El nombre es obligatorio";
    }

    if (apellidos.trim() === "") {
      errors.apellidos = "Los apellidos son obligatorios";
    }

    if (email.trim() === "") {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!isValidEmail(email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }

    if (telefono.trim() !== "" && !isValidPhoneNumber(telefono)) {
      errors.telefono = "Ingrese un número de teléfono válido";
    }

    if (password.trim() === "") {
      errors.password = "La contraseña es obligatoria";
    } else if (password !== password_confirmation) {
      errors.password_confirmation = "Las contraseñas no coinciden";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Realizar acción deseada (por ejemplo, enviar formulario)
      console.log("Formulario enviado");

      // Realizar la solicitud POST al endpoint de registro
      axios
      .post("https://marketplaceppc.fly.dev/api/register", formData)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);

        // Obtener el token de acceso de la respuesta
        const { token } = response.data;

        // Guardar el token en la cookie
        Cookies.set("token", token);  
        Cookies.set('registro', JSON.stringify(response.data));
       // Cookies.set('id_user', response.data.client, { path: '/' });
        Cookies.set('id_user', response.data.client.id_user, { path: '/' });
        Cookies.set('idRole', response.data.user.idRole, { path: '/' });
        
        

        // Realizar alguna acción adicional aquí
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
          setServerErrors({});
        } else {
          console.error("Error:", error);
        }
      });
  }
};

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^09\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <MDBContainer className="my-5 register-container">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5 bd-5 me-5">
            <div className="text-center">
              <Link to="/">
                <img src={canasta} className="register-image" alt="logo" />
              </Link>
              <h4 className="mt-1 mb-5 pb-1 register-title">Regístrate</h4>
            </div>
            <form onSubmit={handleSubmit} className="register-form">
              <MDBInput
                wrapperClass="mt-4"
                label="Nombres"
                id="form1"
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
                validation="required"
                invalid={errors.nombres ? "true" : "false"}
              />
              {errors.nombres && (
                <div className="register-error">{errors.nombres}</div>
              )}

              <MDBInput
                wrapperClass="mt-4"
                label="Apellidos"
                id="form2"
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                validation="required"
                invalid={errors.apellidos ? "true" : "false"}
              />
              {errors.apellidos && (
                <div className="register-error">{errors.apellidos}</div>
              )}

              <MDBInput
                wrapperClass="mt-4"
                label="Correo Electrónico"
                id="form3"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                validation="required"
                invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <div className="register-error">{errors.email}</div>
              )}


              <MDBInput
                wrapperClass="mt-4"
                label="Teléfono"
                id="form4"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                validation="required"
                invalid={errors.telefono ? "true" : "false"}
              />
              {errors.telefono && (
                <div className="register-error">{errors.telefono}</div>
              )}

              <MDBInput
                wrapperClass="mt-4"
                label="Contraseña"
                id="form5"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                validation="required"
                invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <div className="register-error">{errors.password}</div>
              )}

              <MDBInput
                wrapperClass="mt-4"
                label="Confirmar Contraseña"
                id="form6"
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                validation="required"
                invalid={errors.password_confirmation ? "true" : "false"}
              />
              {errors.password_confirmation && (
                <div className="register-error">
                  {errors.password_confirmation}
                </div>
              )}

              <div className="text-center pt-1 mb-5 pb-1 mt-3">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">
                  Registrarse
                </MDBBtn>
              </div>
            </form>

            <div className="register-link-container">
              <p className="mb-0 register-link-text">
                ¿Ya tienes una cuenta?
              </p>
              <Link to="/login" className="register-link">
                <MDBBtn outline className="mx-2" color="danger">
                  Iniciar Sesión
                </MDBBtn>
              </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">PideXAqui</h4>
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

export default Register;
