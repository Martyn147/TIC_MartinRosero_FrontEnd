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
  import {EditProducts} from "./EditProducts"
  import {CrudOrders} from "./CrudOrders"
  import {CrudAccounts} from "./CrudAccounts"
  import {CreateAccount} from "./CreateAccount"
  import {OrderDetails} from "./OrderDetails"
  

  
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
              <Route path='/EditProducts' exact Component={EditProducts}/>
              <Route path='/IndexOrders' exact Component={CrudOrders}/>
              <Route path='/IndexAcontsAdmins' exact Component={CrudAccounts}/>
              <Route path='/CreateAccount' exact Component={CreateAccount}/>
              <Route path="/MiPedido/:id" exact Component={OrderDetails}/>

          </Routes>
      </section>

    )
  }
  