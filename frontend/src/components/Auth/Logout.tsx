import React from 'react';
import {setUser} from 'redux/actions/User';
import store from 'redux/Store';
import {useLogoutMutation} from 'generated/graphql';
import {Link} from 'react-router-dom';

function Logout() {
  const [logout] = useLogoutMutation();

  const onLogoout = async () => {
    await logout();
    store.dispatch(setUser(null));
  };

  return (
    <>
      <Link to='/' onClick={onLogoout}>
        Logout
      </Link>
    </>
  );
}

export default Logout;
