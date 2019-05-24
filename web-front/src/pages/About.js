import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  return (
    <div className="container">
      <h1 className="title is-spaced">whatsthat.dog</h1>
      <h2 className="subtitle is-spaced is-4">
        Whatsthat.dog is a small hobby POC kind of project to keep deep learning
        skills up to date and also to explore running a machine learning model
        in a browser environment with Tensorflow JavaScript. Please do
        contribute if you are interested by making a pull request to GitHub, and
        contact me if you have any questions.
      </h2>
      <div className="buttons">
        <NavLink to="/" className="button is-large" activeClassName="is-active">
          <span class="icon">
            <FontAwesomeIcon icon="chevron-left" />
          </span>
          <span> Back to app</span>
        </NavLink>
      </div>
    </div>
  );
};

export default About;
