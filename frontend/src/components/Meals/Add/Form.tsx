import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import './Form.scss';

interface IProps {
  onSubmit: SubmitHandler<Record<string, any>>;
}

function AddMealForm(props: IProps) {
  const {register, handleSubmit, errors} = useForm();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <input
        name='name'
        className='name'
        defaultValue=''
        ref={register({required: true})}
      />
      {errors.name && <span>Name is required</span>}

      <input type='submit' />
    </form>
  );
}

export default AddMealForm;
