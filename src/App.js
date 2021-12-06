import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import CreateTodo from "./components/CreateTodo";
import ResetPassword from "./components/ResetPassword";
import Avatar from "./components/Avatar";
import firebase from "./firebase";
import Spinner from "react-bootstrap/Spinner";

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/CreateTodo" component={CreateTodo} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/Avatar" component={Avatar} />
        </Switch>
      </div>
    </Router>
  ) : (
    <Spinner />
  );
};

export default App;
