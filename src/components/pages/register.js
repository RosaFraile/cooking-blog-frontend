import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <div className='auth'>
        <div className='close-window'><Link to="/"><FontAwesomeIcon icon="xmark" /></Link></div>
        <h1>Register to post your recipes</h1>
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
    );
  }
}