import React, {useContext} from 'react';
import {SidebarStateContext} from '../../contexts/Sidebar/Context';

function Header() {
  const {sidebarState, setSidebarState} = useContext(SidebarStateContext);

  return (
    <div>
      <h1>Header</h1>
      <button onClick={() => setSidebarState(!sidebarState)}>
        Toggle sidebar
      </button>
    </div>
  );
}

export default Header;
