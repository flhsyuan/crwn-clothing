import React from "react";
import { Link } from "react-router-dom";
// This is a special React syntax
import { ReactComponent as Logo1 } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = () => (
  <div className="header">
    <Link clessName="logo-container" to="/">
      <Logo1 className="logo" />
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
    </div>
  </div>
);

export default Header;
