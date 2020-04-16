import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'


export const Navbar: React.FC = () => {

    class Version {
        major: number = 0;
        minor: number = 0;
        build: number = 0;
        revision: number = 0;
    }

    const [version, setVersion] = useState("");

    useEffect(() => {
        axios.get('/api/version')
            .then(response => {
                let vers: Version = response.data;
                let displayVersion = vers.major + "." + vers.minor + "." + vers.build + "." + vers.revision;
                setVersion(displayVersion);
                //setVersion(response.data);
            })
    }, []);

  //let version = require('../../package.json').version;

  return (
    <nav>
      <div className="nav-wrapper cyan darken-1 px1">
        <NavLink to="/" className="brand-logo">
          Health-Barbecue
        </NavLink>
              <div className="version" >{version}</div>
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