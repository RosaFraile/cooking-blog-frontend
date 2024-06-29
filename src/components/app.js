import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import WriteRecipe from "./pages/writeRecipe";
import RecipeDetail from "./pages/recipeDetail";
import Tricks from "./pages/tricks";
import TrickDetail from "./pages/trickDetail";
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
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register} />
              <Route path="/write" component={WriteRecipe} />
              <Route path="/recipe/:id" component={RecipeDetail}/>
              <Route path="/tricks" component={Tricks}/>
              <Route path="/trick/:id" component={TrickDetail}/>
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
