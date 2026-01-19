import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">Recipes</Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/create_recipe">Create Recipe</Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
