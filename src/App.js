import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PatientList from "./components/PatientList";
import EditPatient from "./components/EditPatient";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <PatientList />
        </Route>
        <Route path="/add">
          <EditPatient action="create" />
        </Route>
        <Route path="/update/:id">
          <EditPatient action="update" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
