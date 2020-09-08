import {MEALS_ADD, MEALS_REMOVE} from 'redux/reducers/Meals';

export function addMeal() {
  return {
    type: MEALS_ADD,
  };
}

export function removeMeal() {
  return {
    type: MEALS_REMOVE,
  };
}
