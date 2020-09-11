import IMealType from 'interfaces/IMealType';
import {MEAL_TYPE_SET} from 'redux/reducers/MealType';

export function setMealType(mealType: IMealType | null) {
  return {
    type: MEAL_TYPE_SET,
    payload: mealType,
  };
}
