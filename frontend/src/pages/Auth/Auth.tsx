import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import IForm from 'interfaces/IForm';
import React from 'react';
import {useLoginMutation, useRegisterMutation} from 'generated/graphql';
import {useHistory} from 'react-router-dom';
import store from 'redux/Store';
import './Auth.scss';
import {setUser} from 'redux/actions/User';

function Auth() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const history = useHistory();

  const onLogin = async (values: IForm) => {
    const res = await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    if (res.data?.login.error) {
      console.log('Error', res.data?.login.error);
      return;
    }
    if (res.data?.login?.user?.id) {
      onSuccess(res.data.login.user);
    }
  };

  const onRegister = async (values: IForm) => {
    const res = await register({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    if (res.data?.register.error) {
      console.log('Error', res.data?.register.error);
      return;
    }
    if (res.data?.register?.user?.id) {
      onSuccess(res.data.register.user);
    }
  };

  const onSuccess = ({id, email}: {id: number; email: string}) => {
    store.dispatch(setUser({id, email}));
    history.push('/meals');
  };

  return (
    <div className='auth-page'>
      <h1>Auth page</h1>

      <Login onLogin={onLogin} />
      <Register onRegister={onRegister} />
    </div>
  );
}

export default Auth;
