import IUser from 'interfaces/IUser';

export const USER_SET = 'USER/SET';

interface IAction {
  type: string;
  payload: IUser | null;
}

const defaultState: IUser | null = null;

export default function userReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    case USER_SET:
      return action.payload;
    default:
      return state;
  }
}
