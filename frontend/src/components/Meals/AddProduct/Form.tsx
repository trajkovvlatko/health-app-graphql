import IForm from 'interfaces/IForm';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import AddProductAutocomplete from './Autocomplete';
import './Form.scss';

interface IProps {
  onSubmit: SubmitHandler<Record<string, any>>;
}

interface IValues {
  productId?: number;
  productName?: string;
  amount?: number;
}

function AddMealProductForm(props: IProps) {
  const {register, handleSubmit, errors} = useForm();
  const values: IValues = {};

  const onSubmit = (data: IForm, e: any) => {
    if (data.amount) {
      values.amount = data.amount;
      props.onSubmit(values);
      e.target.reset();
    }
  };

  const onProductSelect = (id: number, name: string) => {
    values.productId = id;
    values.productName = name;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddProductAutocomplete onProductSelect={onProductSelect} />

      <input
        name='amount'
        className='amount'
        defaultValue=''
        placeholder='Amount'
        ref={register({required: true})}
      />
      {errors.amount && <span>Amount is required</span>}

      <input type='submit' value='Add product' />
    </form>
  );
}

export default AddMealProductForm;
