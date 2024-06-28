import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import WritePost from "./pages/writePost";
import PostDetail from "./pages/postDetail";
import NoMatch from "./pages/noMatch";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register} />
                <Route path="/write" component={WritePost} />
                <Route path="/post/:id" component={PostDetail}/>
                <Route component={NoMatch} />
              </Switch>
          </Router>
      </div>
    );
  }
}
