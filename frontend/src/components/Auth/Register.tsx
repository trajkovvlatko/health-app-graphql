import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

interface IProps {
  onRegister: SubmitHandler<Record<string, any>>;
}

function Register(props: IProps) {
  const {register, handleSubmit, errors} = useForm();

  return (
    <div className='register'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(props.onRegister)}>
        <input
          name='email'
          className='email'
          defaultValue=''
          type='email'
          ref={register({required: true})}
        />
        {errors.email && <span>Email is required</span>}

        <input
          name='password'
          className='password'
          defaultValue=''
          type='password'
          ref={register({required: true})}
        />
        {errors.password && <span>Password is required</span>}

        <input type='submit' value='Register' />
      </form>
    </div>
  );
}

export default Register;
