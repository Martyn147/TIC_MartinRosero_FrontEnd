import "../Register/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import canasta from "../../images/canasta.png";

import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del servidor
          console.log(data); // Puedes realizar alguna acción adicional aquí
        })
        .catch((error) => {
          console.error("Error:", error);
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
    <MDBContainer className="my-5 gradient-form pt-5">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5 bd-5 me-5">
            <div className="text-center">
              <Link to="/">
                <img src={canasta} style={{ width: "150px" }} alt="logo" />
              </Link>
              <h4 className="mt-1 mb-5 pb-1">Regístrate</h4>
            </div>
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
            />
            {errors.nombres && <div className="errormensaje">{errors.nombres}</div>}

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
            />
            {errors.apellidos && <div className="errormensaje">{errors.apellidos}</div>}

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
            />
            {errors.email && <div className="errormensaje">{errors.email}</div>}

            <MDBInput
              wrapperClass="mt-4"
              label="Teléfono"
              id="form4"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
            {errors.telefono && <div className="errormensaje">{errors.telefono}</div>}

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
            />
            {errors.password && <div className="errormensaje">{errors.password}</div>}

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
            />
            {errors.password_confirmation && (
              <div className="errormensaje">{errors.password_confirmation}</div>
            )}

            <div className="text-center pt-1 mb-5 pb-1 mt-3">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit}>
                Registrarse
              </MDBBtn>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-2 mb-4">
              <p className="mb-0">¿Ya tienes una cuenta?</p>
              <Link to="/login">
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
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
