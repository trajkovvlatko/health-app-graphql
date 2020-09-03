import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Sidebar from 'components/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import {SidebarStateContext} from 'contexts/SidebarStateContext';
import './MainLayout.scss';

function MainLayout() {
  const {sidebarState} = useContext(SidebarStateContext);

  return (
    <div className='main-layout'>
      <BrowserRouter>
        <div className='header'>
          <Header />
        </div>

        <div className={`sidebar ${sidebarState ? 'active' : ''}`}>
          <Sidebar />
        </div>

        <div className='content'>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>

            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default MainLayout;
