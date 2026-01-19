import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateRecipe from './components/CreateRecipe'

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create_recipe" element={<CreateRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
