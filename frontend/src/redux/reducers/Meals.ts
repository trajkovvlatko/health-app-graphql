import IMeal from 'interfaces/IMeal';

export const MEALS_SET = 'MEALS/SET';
export const MEALS_ADD = 'MEALS/ADD';
export const MEALS_REMOVE = 'MEALS/REMOVE';

interface IProduct {
  id: number;
  amount: number;
}

interface IMealsState {
  stored: IMeal[];
  pending?: {
    products: IProduct[];
    mealType: number;
  };
}

const defaultState: IMealsState = {stored: []};

export default function mealsReducer(state = defaultState, action: any) {
  switch (action.type) {
    case MEALS_ADD:
      return {...state, stored: [...action.payload, ...state.stored]};
    case MEALS_REMOVE:
      return {
        ...state,
        stored: state.stored.filter((s: IMeal) => s.id !== action.payload),
      };
    case MEALS_SET:
      return {
        ...state,
        stored: action.payload,
      };
    default:
      return state;
  }
}
