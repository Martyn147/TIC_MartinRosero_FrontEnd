import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    idRole: 0, // Asignar el valor correspondiente al idRole del usuario actual
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        formData.idRole === 0 ? "/registerAdmin" : "/registerEmployee",
        {
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }
      );

      // Handle the response from the API if needed (e.g., show a success message)
      console.log(response.data);

      // Clear form fields after successful submission
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});

      // Redireccionar al usuario a la página de administración de cuentas si la creación fue exitosa
      navigate("/IndexAcontsAdmins");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error creating account:", error);
      }
    }
  };

  return (
    <MDBContainer className="crud-list">
      <h1>Crear Cuenta</h1>
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
            />
            {errors.email && (
              <div className="invalid-feedback d-block">{errors.email[0]}</div>
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
            />
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password[0]}</div>
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
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback d-block">{errors.confirmPassword[0]}</div>
            )}
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit">Crear Cuenta</MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default CreateAccount;
