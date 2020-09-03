import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {SidebarStateContext} from '../../contexts/Sidebar/Context';
import './Sidebar.css';

function Sidebar() {
  const {sidebarState} = useContext(SidebarStateContext);

  return (
    <div className={`sidebar ${sidebarState ? 'active' : ''}`}>
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
