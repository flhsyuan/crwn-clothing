import React from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomeButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  // handle the submit
  handleSubmit = async (event) => {
    // get access to the full control on the submit event
    event.preventDefault();
    const { email, password } = this.state;

    // validate the email and password
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.state({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  //The handle change is to set the changed value to the state
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomeButton type="submit"> SIGN IN </CustomeButton>
            <CustomeButton onClick={signInWithGoogle} isGoogleSignIn>
              SIGN IN WITH GOOGLE
            </CustomeButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
