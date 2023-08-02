import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBFooter } from 'mdb-react-ui-kit';
import './style.css';

const Footer = () => {
  return (
    <MDBFooter className=' footer bg-light text-center text-lg-start'>
      <MDBContainer className='footer-content p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Contacto</h5>
            <p>
            Correo: PideXAqui@gmail.com
              
            </p>
            <p>
            Telefono: 099583920
            </p>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Enlaces</h5>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-dark'>Inicio</a>
              </li>
              <li>
                <a href='#!' className='text-dark'>Productos</a>
              </li>
              <li>
                <a href='#!' className='text-dark'>Contacto</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Redes Sociales</h5>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-dark'>Facebook</a>
              </li>
              <li>
                <a href='#!' className='text-dark'>Twitter</a>
              </li>
              <li>
                <a href='#!' className='text-dark'>Instagram</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Pide X Aqui
      </div>
    </MDBFooter>
  );
};

export default Footer;
