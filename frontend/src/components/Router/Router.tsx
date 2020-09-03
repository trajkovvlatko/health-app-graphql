import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Sidebar from '../Sidebar/Sidebar';
import './Router.css';
import Header from '../Header/Header';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />

        <div>
          <Switch>
            <Route path='/about'>
              <About />
            </Route>

            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Router;
