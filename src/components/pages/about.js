import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../navigation/navbar';
import aboutImg from "../../../static/assets/images/about-img.png";

const About = () => {
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
                    <div>
                        <h1>About us</h1>
                    </div>
                    <div>
                        <h3>Get to know Cook's Corner!</h3>
                    </div>
                    <div>
                        <p>Cook's Corner is your go-to source for practical, useful and clever solutions to make your live easier when you need inspiration
                        to prepare your meals.</p>
                    </div>
                    <div>
                        <ul>
                            <li>Quick, tasty meals. Our collection of simple, healthful recipes have fewer ingredients and won't take forever
                            to get to the table.</li>
                            <li>Cleaning and organizing hacks. A clean, organized space means a clean, organized mind. Let us help you find your bliss.</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Would you like to join our comunity?</h3>
                    </div>   
                    <div>
                        <p>Do you have any recipe or cooking trick that want to share with the world?</p>
                        <p>Then this is the right spot for you.</p>
                    </div>
                    <div>
                    <p><Link className="about-link" to="/register">Register</Link> and start publishing your own recipes, advice or cooking tricks!!!</p>
                    </div>
               </div>
           </div>
       </div>
   );

}

export default About;