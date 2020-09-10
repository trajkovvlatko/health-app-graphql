import IUser from 'interfaces/IUser';
import {USER_SET} from 'redux/reducers/User';

export function setUser(user: IUser | null) {
  return {
    type: USER_SET,
    payload: user,
  };
}
