import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/:details" component={Details} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
