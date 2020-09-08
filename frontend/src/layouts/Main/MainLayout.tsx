import React, {useContext} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from 'pages/Home/Home';

import Sidebar from 'components/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import {SidebarStateContext} from 'contexts/SidebarStateContext';

import './MainLayout.scss';
import Meals from 'pages/Meals/Meals';
import Weight from 'pages/Weight/Weight';
import Health from 'pages/Health/Health';
import Workout from 'pages/Workout/Workout';
import History from 'pages/History/History';
import Reminders from 'pages/Reminders/Reminders';
import Reports from 'pages/Reports/Reports';
import MyProducts from 'pages/MyProducts/MyProducts';
import Profile from 'pages/Profile/Profile';

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
            <Route path='/meals'>
              <Meals />
            </Route>

            <Route path='/weight'>
              <Weight />
            </Route>

            <Route path='/health'>
              <Health />
            </Route>

            <Route path='/workout'>
              <Workout />
            </Route>

            <Route path='/history'>
              <History />
            </Route>

            <Route path='/reminders'>
              <Reminders />
            </Route>

            <Route path='/reports'>
              <Reports />
            </Route>

            <Route path='/my_products'>
              <MyProducts />
            </Route>

            <Route path='/profile'>
              <Profile />
            </Route>

            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>

        <div className='footer'>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default MainLayout;
