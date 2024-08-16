import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import authImg from '../../../static/assets/images/auth-img.png';
import Logo from '../../../static/assets/images/cook-logo.png';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
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
    this.props.clearErrorText();
    this.props.login(this.state, () => {
      this.props.history.push("/");
    })
    /*
    this.setState ({
      errorText: this.props.errorText
    }) 
    */
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
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}/>
            <button type="submit">Login</button>
          </form>
          <p className='errMsg'>{this.props.errorText}</p>
          <p>Don't you have an account? <span><Link to="/register" className="link">Register</Link></span></p>
        </div>
      </div>
    );
  } 
}

function mapStateToProps(state) {
  return {
      errorText: state.user.errorText
  }
}

export default connect(mapStateToProps, actions)(Login);

// export default connect(null, actions)(Login);