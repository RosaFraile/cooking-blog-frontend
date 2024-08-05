import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import RecipeManager from "./recipes/recipeManager";
import TrickManager from "./tricks/trickManager";
import RecipeDetail from "./pages/recipeDetail";
import Tricks from "./pages/tricks";
import About from "./pages/about"
import NoMatch from "./pages/noMatch";

import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();
  }

  render() {
    return (
      <div className='app'>
        <div className='container'>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login}/>
              <Route path="/recipeManager" component={RecipeManager} />
              <Route path="/trickManager" component={TrickManager} />
              <Route path="/recipe/:id" component={RecipeDetail}/>
              <Route path="/tricks" component={Tricks}/>
              <Route path="/about" component={About} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
