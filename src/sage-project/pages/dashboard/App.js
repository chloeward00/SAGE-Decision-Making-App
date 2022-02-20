import "../styles/styles.css";
import "../../styles/styles.css";
import Fav from "./Fav";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Fav" component={Fav} />
        </Switch>
      </Router>
    </div>
  );
}
