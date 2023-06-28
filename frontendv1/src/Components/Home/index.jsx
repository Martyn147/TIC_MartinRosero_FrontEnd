import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/productos?category=${category}`);
  };

  return (
    <div className="inicio" style={{ marginTop: "120px" }}>
      <h1 className="title">Nuestros Productos</h1>

      <MDBRow className="row-cols-1 row-cols-md-3 g-5 m-2 mb-5">
        <MDBCol>
          <MDBCard
            className="h-100 hover-zoom"
            onClick={() => handleCardClick("2")}
          >
            <MDBCardImage
              className="card-image"
              src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="..."
              position="top"
            />
            <a href="#!">
              <div className="mask"></div>
            </a>
            <MDBCardBody>
              <MDBCardTitle>Limpieza</MDBCardTitle>
              <MDBCardText>
                <p>Los mejores productos de Limpieza!!!</p>
                PidelosXaqui
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard
            className="h-100 hover-zoom"
            onClick={() => handleCardClick("3")}
          >
            <MDBCardImage
              className="card-image"
              src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80"
              alt="..."
              position="top"
            />
            <a href="#!">
              <div className="mask"></div>
            </a>
            <MDBCardBody>
              <MDBCardTitle>Tecnologia</MDBCardTitle>
              <MDBCardText>
                <p>Productos de alta gama!!!</p>
                PidelosXaqui
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol>
          <MDBCard
            className="h-100 hover-zoom"
            onClick={() => handleCardClick("1")}
          >
            <MDBCardImage
              className="card-image"
              src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="..."
              position="top"
            />
            <a href="#!">
              <div className="mask"></div>
            </a>
            <MDBCardBody>
              <MDBCardTitle>Alimentos</MDBCardTitle>
              <MDBCardText>
                <p>Correcta nutricion!!!</p>
                PidelosXaqui
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
