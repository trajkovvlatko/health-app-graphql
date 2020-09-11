import {MealFragment} from 'generated/graphql';
import IMealProduct from 'interfaces/IMealProduct';

export const MEALS_SET = 'MEALS/SET';
export const MEALS_ADD = 'MEALS/ADD';
export const MEALS_REMOVE = 'MEALS/REMOVE';
export const MEAL_PRODUCT_ADD = 'MEAL_PRODUCT/ADD';

interface IMealsState {
  stored: MealFragment[];
  pending: {
    products: IMealProduct[];
    mealType: null | number;
  };
}

const defaultState: IMealsState = {
  stored: [],
  pending: {
    products: [],
    mealType: null,
  },
};

export default function mealsReducer(
  state = defaultState,
  action: any,
): IMealsState {
  switch (action.type) {
    case MEALS_ADD:
      return {...state, stored: [...action.payload, ...state.stored]};

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
        pending: {
          mealType: state.pending.mealType,
          products: [action.payload, ...state.pending.products],
        },
      };

    default:
      return state;
  }
}
