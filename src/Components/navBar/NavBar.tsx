import React from "react";
import Balance from "../Store/balance";
import { Link } from "react-router-dom";

import "../../styles/navBar.scss";

const NavBar: React.FC = () => {
  return (
    <nav className='nav-bar'>
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-links-wrapper">
            <Link to={"/"}>Main</Link>
            <Link to={"coin-flip"}>Coin flip</Link>
          </div>
          <div>
            <p>Balance {Balance.count}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
