import React from "react";
import Header from "./Header";
import UserControl from "./UserControl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path = "/signin">
          <Signin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App();