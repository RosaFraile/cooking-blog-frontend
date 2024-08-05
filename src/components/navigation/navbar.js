import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { connect } from 'react-redux';
import Dropdown from '../dropdown/dropdown';
import DropdownItem from '../dropdown/dropdownItem';

import * as actions from '../../actions';

import Logo from '../../../static/assets/images/cook-logo.png';


class Navbar extends Component {
    constructor(props) {
        super(props);

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

    handleLogout(event) {
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
                        <div>
                            {this.props.currentUser ?
                                (   <Dropdown
                                        buttonText={<FontAwesomeIcon className="write" icon="circle-plus" />}
                                        content={(<div>
                                            <Link className="link" to="/recipeManager">
                                                <DropdownItem>Recipe</DropdownItem>
                                            </Link>
                                            <Link className="link" to="/trickManager">
                                                <DropdownItem>Trick</DropdownItem>
                                            </Link>
                                        </div>
                                        )}
                                    ></Dropdown>
                                ):(
                                    null
                                )
                            }    
                        </div>
                    <div>
                        <FontAwesomeIcon icon="user" /> {this.props.currentUser ?  this.props.currentUser.users_username : null}
                    </div>
                        <div>
                            {this.props.currentUser ?
                                (
                                    <Link to="/" onClick={this.handleLogout} className='logStatus link'>Logout</Link>
                                ) : (
                                    <Link to="/login" className='logStatus link'>Login</Link>
                                )
                            }
                        </div>
                        
                    </div>
                </div>
                <div className='bottom-navbar' id='links-list'>
                    <div className='navbar-links'>
                        <NavLink className="navbar-link link" exact to="/" activeClassName="nav-link-active">
                            <h6>RECIPES</h6>
                        </NavLink>
                        <NavLink className="navbar-link link" to="/tricks" activeClassName="nav-link-active">
                            <h6>COOKING TRICKS</h6>
                        </NavLink>
                        {this.props.currentUser ? (
                            <div className='manager-group'>
                                <NavLink className="navbar-link link" to="/recipeManager" activeClassName="nav-link-active">
                                    <h6>RECIPES MANAGER</h6>
                                </NavLink>
                                <NavLink className="navbar-link link" to="/trickManager" activeClassName="nav-link-active">
                                    <h6>TRICKS MANAGER</h6>
                                </NavLink>
                            </div>
                        ) : (
                            null
                        )}
                        <NavLink className="navbar-link link" to="/about" activeClassName="nav-link-active">
                            <h6>ABOUT US</h6>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, actions)(Navbar);