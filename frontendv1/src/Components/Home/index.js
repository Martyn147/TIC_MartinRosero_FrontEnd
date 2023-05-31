import React from 'react'
import Portada from "../../images/inicio.jpg"
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
   <div className="inicio">
    <Link to="/">
        <h1 className="title">Inicio</h1>
    </Link>
    <Link to="/Productos">
        <h1 className="title">Productos</h1>
    </Link>
    <img src={Portada} alt="inicio" />
   </div>
  )
}
