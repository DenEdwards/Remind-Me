import React from "react";
import Home from "./Home";

import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Route path="/" exact component={Home}/>
      </Router>
    </div>
  );
}

export default App;
