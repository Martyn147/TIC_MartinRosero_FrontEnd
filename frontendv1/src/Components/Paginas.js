  import React from 'react'
  import { Routes, Route } from 'react-router-dom'
  import {Home} from "./Home"
  import {ProductsList} from "./Products"
  import {Login} from "./Login"
  import {Register} from "./Register"

  export const Paginas = () => {
    return (
      <section>
          <Routes>
              <Route path='/' exact Component={Home}/>
              <Route path='/login' exact Component={Login}/>
              <Route path='/register' exact Component={Register}/>
              <Route path='/productos' exact Component={ProductsList}/>

          </Routes>
      </section>

    )
  }
