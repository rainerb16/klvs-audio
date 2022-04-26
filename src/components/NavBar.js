import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.scss'
import Logo from "../images/logo.png"


const NavBar = () => {
  return (
    <header>
      <div className="nav-wrapper">
        <NavLink to="/" exact="true" className="header-link">
          <img src={Logo} alt="logo" className="header-logo" />
        </NavLink>
          <nav className="nav-bar">
            <NavLink to="/mastering" className="nav-link">
              Mixing/Mastering
            </NavLink>
            <NavLink to="/work" className="nav-link">
              Work
            </NavLink>
            <NavLink to="/post" className="nav-link">
              Blog
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar