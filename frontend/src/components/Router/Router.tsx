import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import './Router.css';
import Sidebar from '../Sidebar/Sidebar';

function Router() {
  return (
    <>
      <BrowserRouter>
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
