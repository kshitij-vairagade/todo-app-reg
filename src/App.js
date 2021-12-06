import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import CreateTodo from "./components/CreateTodo";
import ResetPassword from "./components/ResetPassword";
import Avatar from "./components/Avatar";

const App = () => {
  return(
  <Router>
    <div>
      <Routes>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/CreateTodo" component={CreateTodo} />
        <Route exact path="/ResetPassword" component={ResetPassword} />
        <Route exact path="/Avatar" component={Avatar} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
