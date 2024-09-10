import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mensadmin from './Admin'
import Menaddcort from './Additems'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Mensadmin' element={<Mensadmin />} />
          <Route path='/Menaddcort' element={<Menaddcort />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App