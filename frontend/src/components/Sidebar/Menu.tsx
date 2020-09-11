import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import store from 'redux/Store';
import Logout from 'components/Auth/Logout';

function Menu() {
  const [hasUser, setHasUser] = useState(false);

  store.subscribe(() => setHasUser(!!store.getState().user));

  return (
    <>
      {hasUser ? (
        <>
          <ul>
            <li>
              <NavLink exact to='/' activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/meals' activeClassName='active'>
                Meals
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/weight' activeClassName='active'>
                Weight
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/health' activeClassName='active'>
                Health
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/workout' activeClassName='active'>
                Workout
              </NavLink>
            </li>
          </ul>

          <ul>
            <li>
              <NavLink exact to='/history' activeClassName='active'>
                History
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/reminders' activeClassName='active'>
                Reminders
              </NavLink>
            </li>
          </ul>

          <ul>
            <li>
              <NavLink exact to='/reports' activeClassName='active'>
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/my_products' activeClassName='active'>
                My products
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/profile' activeClassName='active'>
                Profile
              </NavLink>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </>
      ) : (
        <ul>
          <li>
            <NavLink exact to='/' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/auth' activeClassName='active'>
              Auth
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
}

export default Menu;
