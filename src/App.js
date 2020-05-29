import "./App.css";
import React, { Component } from "react";
import LayoutComponent from "./components/Layout";
import StandByComponent from "./components/StandBy";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LANDING, LOGGING } from "./routes";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={LANDING} component={LayoutComponent} />
        <Route path={LOGGING} component={StandByComponent} />
      </Switch>
    </Router>
  );
};

export default App;
