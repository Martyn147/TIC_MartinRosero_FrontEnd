import React from 'react'
import IMG from "../../images/img01.jpg"

export const ProductsList = () => {
    return (
        <>
            <h1 className="title">PRODUCTOS</h1>


            <div className="products">
            <div className="product">
                    <a href="#">
                        <div className="product__img">
                            <img src={IMG} alt="" />
                        </div>
                    </a>
                    <div className="product__footer">
                        <h1>title</h1>
                        <p>categoria</p>
                        <p className="price">$350</p>
                    </div>
                    <div className="buttom">
                        <button className="btn">
                            Añadir al carrito
                        </button>
                        <div>
                            <a href="#" className="btn">Vista</a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product__img">
                            <img src={IMG} alt="" />
                        </div>
                    </a>
                    <div className="product__footer">
                        <h1>title</h1>
                        <p>categoria</p>
                        <p className="price">$350</p>
                    </div>
                    <div className="buttom">
                        <button className="btn">
                            Añadir al carrito
                        </button>
                        <div>
                            <a href="#" className="btn">Vista</a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product__img">
                            <img src={IMG} alt="" />
                        </div>
                    </a>
                    <div className="product__footer">
                        <h1>title</h1>
                        <p>categoria</p>
                        <p className="price">$350</p>
                    </div>
                    <div className="buttom">
                        <button className="btn">
                            Añadir al carrito
                        </button>
                        <div>
                            <a href="#" className="btn">Vista</a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product__img">
                            <img src={IMG} alt="" />
                        </div>
                    </a>
                    <div className="product__footer">
                        <h1>title</h1>
                        <p>categoria</p>
                        <p className="price">$350</p>
                    </div>
                    <div className="buttom">
                        <button className="btn">
                            Añadir al carrito
                        </button>
                        <div>
                            <a href="#" className="btn">Vista</a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product__img">
                            <img src={IMG} alt="" />
                        </div>
                    </a>
                    <div className="product__footer">
                        <h1>title</h1>
                        <p>categoria</p>
                        <p className="price">$350</p>
                    </div>
                    <div className="buttom">
                        <button className="btn">
                            Añadir al carrito
                        </button>
                        <div>
                            <a href="#" className="btn">Vista</a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product__img">
                            <img src={IMG} alt="" />
                        </div>
                    </a>
                    <div className="product__footer">
                        <h1>title</h1>
                        <p>categoria</p>
                        <p className="price">$350</p>
                    </div>
                    <div className="buttom">
                        <button className="btn">
                            Añadir al carrito
                        </button>
                        <div>
                            <a href="#" className="btn">Vista</a>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
