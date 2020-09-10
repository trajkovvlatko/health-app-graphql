import {combineReducers} from '@reduxjs/toolkit';
import mealsReducer from './Meals';
import userReducer from './User';

export default combineReducers({
  mealsReducer,
  userReducer,
});
