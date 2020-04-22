import React from "react";
import { Link } from "react-router-dom";
// This is a special React syntax
import { ReactComponent as Logo1 } from "../../assets/crown.svg";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.component";

import CartDropDown from "../cart-dropdown/cart-dropdown.component";

import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user-selector";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link clessName="logo-container" to="/">
      {/* put the logo inside the Link  */}
      <Logo1 className="logo" />
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      {/* <Link className="option" to="/signin">
        SIGN IN
      </Link> */}
      {
        // if the currentUser is a real user then, sign out
        currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )
      }

      <CartIcon />
    </div>
    {hidden ? null : <CartDropDown />}
  </div>
);

// the state in the prop is the top level root reducer
// in case of multiple selectors, we just use the createStructuredSelector to combine all the selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// header re-render based on the mapStateProps function
export default connect(mapStateToProps)(Header);
