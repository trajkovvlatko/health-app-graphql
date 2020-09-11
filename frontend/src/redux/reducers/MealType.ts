import IMealType from 'interfaces/IMealType';

export const MEAL_TYPE_SET = 'MEAL_TYPE/SET';

interface IAction {
  type: string;
  payload: IMealType | null;
}

const defaultState: IMealType | null = null;

export default function mealTypeReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    case MEAL_TYPE_SET:
      return action.payload;
    default:
      return state;
  }
}
