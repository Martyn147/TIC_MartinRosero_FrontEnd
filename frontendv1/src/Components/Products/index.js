import React from 'react';
import IMG from "../../images/img01.jpg";
import '../Products/style.css';

export const ProductsList = () => {
  return (
    <>
      <h1 className="products-list__title">PRODUCTOS</h1>

      <div className="products-list">
        <div className="product-item">
          <a href="#">
            <div className="product-item__img">
              <img src={IMG} alt="" />
            </div>
          </a>
          <div className="product-item__footer">
            <h1 className="product-item__title">Título</h1>
            <p className="product-item__category">Categoría</p>
            <p className="product-item__price">$350</p>
          </div>
          <div className="product-item__buttons">
            <button className="product-item__btn-add">Añadir al carrito</button>
            <div>
              <a href="#" className="product-item__btn-view">Vista</a>
            </div>
          </div>
        </div>
        {/* Resto de los productos */}
      </div>
    </>
  );
};
