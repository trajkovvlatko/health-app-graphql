import {UserFragment} from 'generated/graphql';
import {setUser} from 'redux/actions/User';
import user from './User';

describe('when action.type is USER/SET', () => {
  it('sets a new user when the store is null', () => {
    const newUser: UserFragment = {id: 1, email: 'email@email.com'};
    const res = user(null, setUser(newUser));
    expect(res).toEqual(newUser);
  });

  it('overwrites any existing state', () => {
    const newUser: UserFragment = {id: 2, email: 'email2@email2.com'};
    const initialState = {id: 123, email: 'email123@email123.asd'};
    const res = user(initialState, setUser(newUser));
    expect(res).toEqual(newUser);
  });
});
