import IMeal from 'interfaces/IMeal';
import {MEALS_SET, MEALS_ADD, MEALS_REMOVE} from 'redux/reducers/Meals';

export function addMeal(meal: IMeal) {
  return {
    type: MEALS_ADD,
    payload: meal,
  };
}

export function removeMeal(id: number) {
  return {
    type: MEALS_REMOVE,
    id,
  };
}

export function setMeals(meals: IMeal[]) {
  return {
    type: MEALS_SET,
    payload: meals,
  };
}
