import {MealFragment} from 'generated/graphql';
import IMealProduct from 'interfaces/IMealProduct';

export const MEALS_SET = 'MEALS/SET';
export const MEALS_ADD = 'MEALS/ADD';
export const MEALS_REMOVE = 'MEALS/REMOVE';
export const MEAL_PRODUCT_ADD = 'MEAL_PRODUCT/ADD';
export const MEAL_PRODUCT_CLEAR = 'MEAL_PRODUCT/CLEAR';

interface IMealsState {
  stored: MealFragment[];
  pending: IMealProduct[];
}

const defaultState: IMealsState = {
  stored: [],
  pending: [],
};

export default function mealsReducer(
  state = defaultState,
  action: any,
): IMealsState {
  switch (action.type) {
    case MEALS_ADD:
      console.log(action.payload);
      console.log(state.stored);
      return {...state, stored: [action.payload, ...state.stored]};

    case MEALS_REMOVE:
      return {
        ...state,
        stored: state.stored.filter(
          (s: MealFragment) => s.id !== action.payload,
        ),
      };

    case MEALS_SET:
      return {
        ...state,
        stored: action.payload,
      };

    case MEAL_PRODUCT_ADD:
      return {
        ...state,
        pending: [action.payload, ...state.pending],
      };

    case MEAL_PRODUCT_CLEAR:
      return {
        ...state,
        pending: [],
      };

    default:
      return state;
  }
}
