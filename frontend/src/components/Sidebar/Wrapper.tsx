import React, {useContext} from 'react';
import {SidebarStateContext} from 'contexts/SidebarStateContext';
import Sidebar from './Sidebar';

function Wrapper() {
  const {sidebarState} = useContext(SidebarStateContext);

  return (
    <div
      data-testid='sidebar-wrapper'
      className={`sidebar ${sidebarState ? 'active' : ''}`}
    >
      <Sidebar />
    </div>
  );
}

export default Wrapper;
