import React from "react";
import { Header } from "./Components/Header";
//import "boxicons";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import {Paginas} from "./Components/Paginas" 


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  return (
    <div className="App">
      {!isLoginPage && !isRegisterPage && <Header />}
      <Paginas />
    </div>
  );
}
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}