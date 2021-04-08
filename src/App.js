import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import MainPage from "./components/MainPage";
import EditPage from "./components/EditPage";

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/add">
          <EditPage action="Create" />
        </Route>
        <Route path="/update/:id">
          <EditPage action="Update" />
        </Route>
      </Switch>
    </Router>
  );
}
