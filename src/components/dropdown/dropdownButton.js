import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropdownButton = ({children, open, toggle}) => {
  return (
    <div
        onClick={toggle}
        className={`dropdown-btn ${open ? "button-open" : null}`}
    >
      {children}<span className='toggle-icon'>{open ? <FontAwesomeIcon icon="chevron-up" /> : <FontAwesomeIcon icon="chevron-down" />}</span>
    </div>
  );
}

export default DropdownButton;