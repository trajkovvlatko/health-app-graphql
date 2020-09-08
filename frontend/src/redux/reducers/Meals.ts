interface IAction {
  type: string;
}

export const MEALS_ADD = 'MEALS/ADD';
export const MEALS_REMOVE = 'MEALS/REMOVE';

const defaultStore: number[] = [];

export default function mealsReducer(state = defaultStore, action: IAction) {
  switch (action.type) {
    case MEALS_ADD:
      return state;
    case MEALS_REMOVE:
      return state;
    default:
      return state;
  }
}
