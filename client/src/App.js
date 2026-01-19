import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateRecipe from './components/CreateRecipe'

const App = () => {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create_recipe" element={<CreateRecipe />} />
      </Routes>
    </div>
  )
}

export default App
