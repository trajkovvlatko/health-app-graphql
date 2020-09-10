import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

interface IProps {
  onLogin: SubmitHandler<Record<string, any>>;
}

function Login(props: IProps) {
  const {register, handleSubmit, errors} = useForm();

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(props.onLogin)}>
        <input
          name='email'
          className='email'
          defaultValue='email@email.com'
          type='email'
          ref={register({required: true})}
        />
        {errors.email && <span>Email is required</span>}

        <input
          name='password'
          className='password'
          defaultValue='password'
          type='password'
          ref={register({required: true})}
        />
        {errors.password && <span>Password is required</span>}

        <input type='submit' value='Login' />
      </form>
    </div>
  );
}

export default Login;
