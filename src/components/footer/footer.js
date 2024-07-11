import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Logo from '../../../static/assets/images/cook-logo.png' 

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='image'>
      <Link className="link" to="/">
        <img src={Logo} alt="Logo" />
      </Link> 
      </div>
        <Link className="link" to="/about">
          <h4>ABOUT US</h4>
        </Link>
      <div>
        <p><FontAwesomeIcon icon="copyright" /> Rosa Fraile - 2024</p>
      </div>
    </footer>
  );
}

export default Footer;