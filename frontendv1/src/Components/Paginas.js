  import React from 'react'
  import { Routes, Route } from 'react-router-dom'
  import {Home} from "./Home"
  import {ProductsList} from "./Products"
  import {Login} from "./Login"
  import {Register} from "./Register"
  import {CrudProducts} from "./CrudProducts"
  import {CreateProducts} from "./CreateProducts"
  import {ShopingCart} from "./ShopingCart"
  import {Profile} from "./Profile"

  export const Paginas = () => {
    return (
      <section>
          <Routes>
              <Route path='/' exact Component={Home}/>
              <Route path='/login' exact Component={Login}/>
              <Route path='/register' exact Component={Register}/>
              <Route path='/productos' exact Component={ProductsList}/>
              <Route path='/IndexProducts' exact Component={CrudProducts}/>
              <Route path='/CreateProduct' exact Component={CreateProducts}/>
              <Route path='/mycart' exact Component={ShopingCart}/>
              <Route path='/MyProfile' exact Component={Profile}/>

          </Routes>
      </section>

    )
  }
