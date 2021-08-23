import React from 'react';
import { useLocation } from 'react-router';
import './index.scss';

const Header = ({title, show, showAddTask}) => {
    const location =useLocation();
    return (
        <div className='header'>
            <p className='title'>{title}</p>
            {location.pathname === '/' && 
            <button className={`btn ${showAddTask ? 'red' : ''}`} onClick={show}>
                {showAddTask ? 'Close' : 'Add'}
            </button>}
        </div>
    )
}

Header.defaultProps = {
    title : 'Task Tracker',
}

export default Header
