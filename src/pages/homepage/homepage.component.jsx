import React from "react";
// import "./homepage.styles.scss";
import Directory from "../../components/directory/directory.component";
//styled components
import { HomePageContianer } from "./homepage.styles";

const HomePage = () => (
  <HomePageContianer>
    <Directory />
  </HomePageContianer>
);
export default HomePage;
