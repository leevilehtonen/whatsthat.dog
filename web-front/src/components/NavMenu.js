import React from 'react';
import { NavLink } from 'react-router-dom'


const NavMenu = ({ isOpen }) => (
  <div className={"navbar-menu " + (isOpen ? "is-active" : "")}>
    <div className="navbar-end">
      <a className="navbar-item" href="https://www.github.com/leevilehtonen/whatsthat.dog">
        Project
      </a>
      <NavLink to="/about" className="navbar-item" activeClassName="is-active">About</NavLink>
    </div>
  </div>
)


export default NavMenu;

