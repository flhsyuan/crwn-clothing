import React from "react";
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

//the styled-components
import {
  HeaderContainer,
  LogoContainer,
  OptionsContianer,
  OptionDiv,
  OptionLink,
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      {/* put the logo inside the Link  */}
      <Logo1 className="logo" />
    </LogoContainer>

    <OptionsContianer>
      <OptionLink to="/shop">SHOP</OptionLink>
      {/* <Link className="option" to="/signin">
        SIGN IN
      </Link> */}
      {
        // if the currentUser is a real user then, sign out
        currentUser ? (
          <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )
      }

      <CartIcon />
    </OptionsContianer>
    {hidden ? null : <CartDropDown />}
  </HeaderContainer>
);

// the state in the prop is the top level root reducer
// in case of multiple selectors, we just use the createStructuredSelector to combine all the selectors
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// header re-render based on the mapStateProps function
export default connect(mapStateToProps)(Header);
