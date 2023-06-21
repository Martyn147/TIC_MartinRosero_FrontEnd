import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import canasta from '../../images/canasta.png';
import '../Login/style.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      setErrors((prevState) => ({
        ...prevState,
        email: '',
      }));
    } else if (name === 'password') {
      setPassword(value);
      setErrors((prevState) => ({
        ...prevState,
        password: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'El email es obligatorio',
      }));
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'El email no es válido',
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'La contraseña es obligatoria',
      }));
      isValid = false;
    }

    // Enviar formulario si es válido
    if (isValid) {
      // Aquí puedes enviar el formulario o realizar alguna acción
      console.log('Formulario enviado');
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form pt-5">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5 bd-5 me-5">
            <div className="text-center">
              <Link to="/">
                <img src={canasta} style={{ width: '150px' }} alt="logo" />
              </Link>
              <h4 className="mt-1 mb-5 pb-1">Inicio de Sesion</h4>
            </div>

            <p>Ingrese sus datos</p>

            <MDBInput
              wrapperClass=""
              label="Email"
              id="form1"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              error={errors.email}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}

            <MDBInput
              wrapperClass="mt-4"
              label="Contraseña"
              id="form2"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              error={errors.password}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}

            <div className="text-center pt-1 mb-5 pb-1 mt-3">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit}>
                Ingresar
              </MDBBtn>
              <a className="text-muted" href="#!">
                ¿Olvido su Contraseña?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-2 mb-4">
              <p className="mb-0">Crear una cuenta</p>
              <Link to="/register">
                <MDBBtn outline className="mx-2" color="danger">
                  Registrarse
                </MDBBtn>
              </Link>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
