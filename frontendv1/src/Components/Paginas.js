import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home} from "./Home"
import {ProductsList} from "./Products"

export const Paginas = () => {
  return (
    <section>
        <Routes>
            <Route path='/' exact Component={Home}/>
            <Route path='/productos' exact Component={ProductsList}/>

        </Routes>
    </section>

  )
}
