import React, { createContext, useState } from 'react';

export const ContextoCarrito = createContext();

export const ContextoCarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <ContextoCarrito.Provider value={{ carrito, agregarAlCarrito }}>
      {children}
    </ContextoCarrito.Provider>
  );
};
