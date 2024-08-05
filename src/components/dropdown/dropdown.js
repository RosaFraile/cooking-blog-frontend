import React, { useState, useEffect, useRef } from 'react';
import DropdownButton from '../dropdown/dropdownButton';
import DropdownContent from '../dropdown/dropdownContent';

const Dropdown = ({buttonText, content}) => {
    const [open, setOpen] = useState(false);
    
    const dropdownRef = useRef();
    const toggleDropdown = () => {
        setOpen((open) => !open)
    }

    useEffect(() => {
        const handler = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handler);

        return() => {
            document.removeEventListener("click", handler);
        }
    }, [dropdownRef])
    
    return (
    <div className='dropdown' ref={dropdownRef}>
        <DropdownButton toggle={toggleDropdown} open={open}>{buttonText}</DropdownButton>
        <DropdownContent open={open}>{open ? content : null}</DropdownContent>
    </div>
  );
}

export default Dropdown;