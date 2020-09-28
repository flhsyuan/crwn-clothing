import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-actions";

// the router
import { Switch, Route, Redirect } from "react-router-dom";
// the components
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-out.component";
import CheckOutPage from "./pages/checkout/checkout.component";

// the selector
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user-selector";

//the auth
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/firebase.utils";

//select the shop data
import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

//the styled components
// import styled from "styled-components";

// define the css for components and pass some props into the CSS.
// const Text = styled.div`
//   color: red;
//   font-size: 28px;
//   border: ${({ IsActive }) =>
//     IsActive ? "1px solid black" : "3px dotted green"};
// `;

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
      // have to destructing the objects store into the firebase
      addCollectionAndDocuments(
        "collections",
        collectionsArray.map(({ title, items }) => ({ title, items }))
      );
    });
  }

  //prevent the memory leaks
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        {/* switch can save resource */}
        <Switch>
          {/* exact is true means it is the exact path to render, component is the page to go */}
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          {/* if the user is logged in, then redirect to the homepage rather than the sign in and sign up page */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/checkout" component={CheckOutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

//dispatch the action object to all the reduciers
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
