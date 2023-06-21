//          export const Header = () => {


import React from 'react'
import canasta from "../../images/canasta.png"
import '../Header/style.css';
import { Link } from 'react-router-dom'
import 'boxicons';


export const Header = () => {
    return (
        <header>

            <Link to="/">
                <div className="logo">
                    <img src={canasta} alt="logo    " width="90" />
                </div>
            </Link>

            <ul>
                <li>
                    <Link to="/">INICIO</Link>
                </li>
                <li>
                    <Link to="/productos">PRODUCTOS</Link>
                </li>
                <li>
                    <Link to="/login">INGRESAR</Link>
                </li>
                <li>
                    <Link to="/register">REGISTRATE</Link>
                </li>
            </ul>
            <div className="cart">
                <box-icon name="cart"></box-icon>
                <span className='item__total'>0</span>
            </div>
        </header>
    )
}
