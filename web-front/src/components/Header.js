import React from 'react';

import { useState } from "react";
import NavMenu from "./NavMenu";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={"navbar animated slideInDown faster"}>
      <div className={"container"}>
        <div className="navbar-brand">
          <span
            className={"navbar-burger burger " + (open ? "is-active" : "")}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </span>
        </div>
        <NavMenu isOpen={open} />
      </div>
    </nav>
  );
};

export default Header;
