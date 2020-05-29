import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
// import clsx from "clsx";
import { ReactComponent as TwitterLogo } from "../../../assets/twitter-logo.svg";

export default ({ onGetStarted = () => {} }) => {
  const [isHover, setHover] = useState(false);
  //fill-opacity:0.46666667
  return (
    <>
      <Jumbotron fluid className="landing">
        <Container className="landing__container">
          <TwitterLogo className="landing__background" />
          <div className="landing__content">
            <div className="landing__content-title">
              Welcome to <br />
              <span className="landing__appName">Tweet Viewer</span>
            </div>
            <p className="landing__content-text">
              The easy way to see and create tweets <br />
              beside Twitter &copy;
            </p>
            <Button
              variant="outline-light"
              className="landing__button"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={onGetStarted}
            >
              Get started
              {/* <FontAwesomeIcon
                icon={faLaughWink}
                className={clsx("landing__button-icon", {
                  ["landing__icon-happy"]: !isHover,
                  ["landing__icon-pulsate"]: isHover,
                })}
              /> */}
            </Button>
          </div>
        </Container>
      </Jumbotron>
      <div className="landing__bottom">
        <div className="landing__bottom-item"></div>
        <div className="landing__bottom-item"></div>
      </div>
    </>
  );
};
