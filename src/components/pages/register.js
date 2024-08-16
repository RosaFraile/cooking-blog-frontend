import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import Logo from '../../../static/assets/images/cook-logo.png';
import authImg from '../../../static/assets/images/auth-img.png';
//import { response } from 'express';
//import { response } from 'express';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      errorText: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    
    axios.post("http://localhost:5000/auth/register", this.state, {
      withCredentials: true
    }).then(response => {
      if(response.data !== "200") {
        this.setState({
          errorText: response.data
        })
      } else {
        this.props.history.push("/login");
      }
    }).catch(error => {
      console.log("handleSubmit error", error);
    })
  }

  render() {
    return (
      <div className='auth-page-wrapper'>
        <div
            className='left-column'
            style={{
                backgroundImage: `url(${authImg})`
            }}
        />
        <div className='right-column'>
        <div className='logo'>
            <Link className="link" to="/">
              <img src={Logo} alt="Logo" />
            </Link>  
          </div>
          <h1>Login to access your posts</h1>
          <form onSubmit={this.handleSubmit}>
          <input required 
              type="text"
              placeholder="username"
              name="username"
              onChange={this.handleChange}/>
            <input required 
              type="email"
              placeholder="email"
              name="email"
              onChange={this.handleChange}/>
            <input required
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}/>
            <button type="submit">Register</button>
          </form>
          <p className='errMsg'>{this.state.errorText}</p>
          <p>Do you have an account? <span><Link to="/login" className="link">Login</Link></span></p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);