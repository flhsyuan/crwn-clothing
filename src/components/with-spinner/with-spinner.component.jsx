import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

//The higher order component takes an component as the input and use the parameters inside the component.
//Practically speaking, we have to implement more HOC in codes.
const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
