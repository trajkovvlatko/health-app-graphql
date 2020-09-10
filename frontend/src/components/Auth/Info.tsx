import IUser from 'interfaces/IUser';
import {useApolloClient} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {useProfileLazyQuery} from 'generated/graphql';
import store from 'redux/Store';
import {setUser} from 'redux/actions/User';
import Loading from 'components/Shared/Loading/Loading';
import Message from 'components/Shared/Message/Message';

function AuthInfo() {
  const [profile, setProfile] = useState<IUser | null>(null);
  store.subscribe(() => setProfile(store.getState().user));

  const [loadProfile, {error, loading}] = useProfileLazyQuery({
    client: useApolloClient(),
    onCompleted: (res) => {
      if (res.profile?.id) {
        store.dispatch(setUser(res.profile));
      }
    },
  });

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className='auth-info'>
      {loading && <Loading />}
      {error && <Message type='error' title='Cannot fetch user profile.' />}
      {profile?.id && <div>Logged in: {profile.email}</div>}
    </div>
  );
}

export default AuthInfo;
