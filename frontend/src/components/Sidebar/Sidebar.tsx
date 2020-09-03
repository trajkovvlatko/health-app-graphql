import React from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <h1>Sidebar</h1>
      <ul>
        <li>
          <NavLink exact to='/' activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/about' activeClassName='active'>
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
