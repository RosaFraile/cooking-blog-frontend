import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../navigation/navbar';
import aboutImg from "../../../static/assets/images/about-img.png";

export default class About extends Component {
    constructor() {
        super();
    
        this.state = {
        }
      }
    
    componentDidMount() {
    //    const recipes = [];
    
        this.setState({
        })
    }

    render() {
        return (
            <div className='about-page-wrapper'>
                <Navbar />
                <div className='about-page-container'>
                    <div
                        className='about-left-column'
                        style={{
                        background: "url(" + aboutImg + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                        }}
                    />
        
                    <div className='about-right-column'>
                        <h1>About us</h1>
                        <h4>Get to know Cook's Corner!</h4>

                        <p>Cook's Corner is your go-to source for practical, useful and clever solutions to make your live easier when you need inspiration
                        to prepare your meals.</p>
                        <ul>
                            <li>Quick, tasty meals. Our collection of simple, healthful recipes have fewer ingredients and won't take forever
                            to get to the table.</li>
                            <li>Cleaning and organizing hacks. A clean, organized space means a clean, organized mind. Let us help you find your bliss.</li>
                        </ul>
                            
                        <h4>Would you like to join our comunity?</h4>
                        <p>Do you have any recipe or cooking trick that want to share with the world?</p>
                        <p>Then this is the right spot for you.</p>

                        <p><Link to="/register">Register</Link> and start publishing your own recipes, advice or cooking tricks!!!</p>
                    </div>
                </div>
            </div>
        );
    }
}