import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FC = () => 
{
  let pjson = require('../../package.json');
  let version = pjson.version;

  return (
    <nav>
      <div className="nav-wrapper cyan darken-1 px1">
        <NavLink to="/" className="brand-logo">
          Health-Barbecue
        </NavLink>
        <div  className="version" >{version}</div>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}