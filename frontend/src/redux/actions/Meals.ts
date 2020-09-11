import {MealFragment} from 'generated/graphql';
import IMealProduct from 'interfaces/IMealProduct';

import {
  MEAL_PRODUCT_ADD,
  MEALS_SET,
  MEALS_ADD,
  MEALS_REMOVE,
} from 'redux/reducers/Meals';

export function addMeal(meal: MealFragment) {
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

export function setMeals(meals: MealFragment[]) {
  return {
    type: MEALS_SET,
    payload: meals,
  };
}

export function addPendingProduct(mealProduct: IMealProduct) {
  return {
    type: MEAL_PRODUCT_ADD,
    payload: mealProduct,
  };
}
