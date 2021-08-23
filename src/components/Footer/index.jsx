import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div style={{textAlign:'center'}}>
            Copyright &copy; 2021
            <Link to='/about'>About</Link>
        </div>
    )
}

export default Footer;
