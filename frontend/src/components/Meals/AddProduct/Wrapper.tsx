import React from 'react';
import AddMealProductForm from './Form';
import IForm from 'interfaces/IForm';
import './Wrapper.scss';
import store from 'redux/Store';
import {addPendingProduct} from 'redux/actions/Meals';

function AddMealProductWrapper() {
  const onSubmit = async (values: IForm) => {
    store.dispatch(
      addPendingProduct({
        productId: parseInt(values.productId),
        productName: values.productName,
        amount: parseInt(values.amount),
      }),
    );
  };

  return (
    <div>
      <b>Add product for this meal</b>

      <AddMealProductForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddMealProductWrapper;
