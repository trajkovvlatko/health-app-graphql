import {combineReducers} from '@reduxjs/toolkit';
import mealsReducer from './Meals';
import userReducer from './User';
import mealTypeReducer from './MealType';

export default combineReducers({
  meals: mealsReducer,
  user: userReducer,
  mealType: mealTypeReducer,
});
