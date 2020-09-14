import React, {useContext} from 'react';
import {SidebarStateContext} from 'contexts/SidebarStateContext';
import './Sidebar.scss';
import Menu from './Menu';

function Sidebar() {
  const toggle = useContext(SidebarStateContext).toggle;

  return (
    <div>
      <h1>Sidebar</h1>
      <Menu />
      <button data-testid='toggle-sidebar-button' onClick={toggle}>
        Toggle sidebar
      </button>
    </div>
  );
}

export default Sidebar;
