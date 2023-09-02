import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const CreateAccount = () => {
  const idRoleFromCookie = Cookies.get('idRole');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    idRole: idRoleFromCookie === '0' ? 0 : 1,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const pageTitle = formData.idRole === 0 ? "Crear cuentas de administrador" : "Crear cuentas de empleados";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmación de contraseña es obligatoria";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post(
        formData.idRole === 0 ? "/registerAdmin" : "/registerEmployee",
        {
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }
      );

      console.log(response.data);

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});

      navigate("/IndexAcontsAdmins");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error creating account:", error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <MDBContainer className="crud-list">
      <h1>{pageTitle}</h1>
      <form onSubmit={handleSubmit}>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <div className="register-error">{errors.email}</div>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="password"
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <div className="register-error">{errors.password}</div>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol>
            <MDBInput
              type="password"
              label="Confirmar Contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <div className="register-error">{errors.confirmPassword}</div>
            )}
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit">Crear Cuenta</MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default CreateAccount;
