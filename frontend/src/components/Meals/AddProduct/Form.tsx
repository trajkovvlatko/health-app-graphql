import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import './Form.scss';

interface IProps {
  onSubmit: SubmitHandler<Record<string, any>>;
}

function AddMealProductForm(props: IProps) {
  const {register, handleSubmit, errors} = useForm();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <input
        name='id'
        className='productId'
        defaultValue=''
        placeholder='Product ID'
        ref={register({required: true})}
      />
      {errors.productId && <span>Product id is required</span>}

      <input
        name='amount'
        className='amount'
        defaultValue=''
        placeholder='Amount'
        ref={register({required: true})}
      />
      {errors.amount && <span>Amount is required</span>}

      <input type='submit' />
    </form>
  );
}

export default AddMealProductForm;
