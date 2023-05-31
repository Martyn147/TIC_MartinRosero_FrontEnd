import React from "react";
import { Header } from "./Components/Header";
import "boxicons";
import { BrowserRouter as Router } from "react-router-dom";
import {Paginas} from "./Components/Paginas" 


function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>

      <Paginas></Paginas>
      </Router>
    </div>
  );
}

export default App;
