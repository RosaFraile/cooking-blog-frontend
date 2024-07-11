import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../static/assets/images/cook-logo.png';

export default class Navbar extends Component {
    constructor() {
        super();

        this.handleHamburgerMenu = this.handleHamburgerMenu.bind(this);
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
                        <div>Rosa</div>
                        <div className='logStatus'>Logout</div>
                        <div>
                            <Link className='write link' to="/write">
                                <FontAwesomeIcon icon="circle-plus" />
                            </Link>
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