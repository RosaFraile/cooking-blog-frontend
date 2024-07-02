import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/cook-logo.png';
import authImg from '../../../static/assets/images/auth-img.png';

export default class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      errorText: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO
    // Call to the API to register the user
    console.log("handleSubmit", event);
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
              type="text"
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