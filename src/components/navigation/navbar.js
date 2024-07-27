import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Logo from '../../../static/assets/images/cook-logo.png';

class Navbar extends Component {
    constructor() {
        super();

        this.handleHamburgerMenu = this.handleHamburgerMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        document.getElementById('toggle').addEventListener('click', this.handleHamburgerMenu);
    }

    componentWillUnmount() {
        document.getElementById('toggle').removeEventListener('click', this.handleHamburgerMenu);
    }

    handleHamburgerMenu() {
        document.getElementById('links-list').classList.toggle('visible');
    }

    handleLogout() {
        event.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <div className='navbar'>
                <div className='top-navbar'>
                    <div className='left-column'>
                        <button className="toggle" id="toggle">
                            <FontAwesomeIcon icon="bars" />
                        </button>   
                        <div className='logo'>
                            <Link className="link" to="/">
                                <img src={Logo} alt="Logo" />
                            </Link>  
                        </div>
                    </div>
                    <div className='right-column'>
                    <div><FontAwesomeIcon icon="user" /> {this.props.currentUser ?  this.props.currentUser.users_username : null}</div>
                        {this.props.currentUser ? (<Link to="/" onClick={this.handleLogout} className='logStatus link'>Logout</Link>) : (<Link to="/login" className='logStatus link'>Login</Link>)}
                        <div>
                            {this.props.currentUser ?
                                (   <Link className='write link' to="/write">
                                        <FontAwesomeIcon icon="circle-plus" />
                                    </Link>
                                ):(
                                    null
                                )
                            }
                            
                        </div>
                    </div>
                </div>
                <div className='bottom-navbar' id='links-list'>
                    <div className='navbar-links'>
                        <Link className="navbar-link link" to="/?cat=starters">
                            <h6>STARTERS</h6>
                        </Link>
                        
                        <Link className="navbar-link link" to="/?cat=main">
                            <h6>MAIN COURSES</h6>
                        </Link>
                        <Link className="navbar-link link" to="/?cat=second">
                            <h6>SECOND COURSES</h6>
                        </Link>
                        <Link className="navbar-link link" to="/?cat=desserts">
                            <h6>DESSERTS</h6>
                        </Link>
                        <Link className="navbar-link link" to="/tricks">
                            <h6>COOKING TRICKS</h6>
                        </Link>
                        <Link className="navbar-link link" to="/about">
                            <h6>ABOUT US</h6>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("From Navbar", state)
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, actions)(Navbar);