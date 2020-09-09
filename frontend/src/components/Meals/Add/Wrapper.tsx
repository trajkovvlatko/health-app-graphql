import React, {useState} from 'react';
import AddMealForm from './Form';
import IForm from 'interfaces/IForm';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import mealsStore from 'redux/stores/Meal';
import {MealFragment, useAddMealMutation} from 'generated/graphql';
import {addMeal} from 'redux/actions/Meals';

const initialState = {
  error: false,
  loading: false,
  success: false,
  result: {} as MealFragment,
};

function AddMealWrapper() {
  const [state, setState] = useState(initialState);
  const [addMealMutation] = useAddMealMutation();

  const onSubmit = async (values: IForm) => {
    setState({...initialState, loading: true});

    // TODO: this should fill a store and render only.
    // Do not save until the save button is clicked.
    const products = [
      {productId: 1, amount: 22},
      {productId: 2, amount: 33},
    ];
    const input = {mealTypeId: 1, userId: 1, products};
    const res = await addMealMutation({
      variables: {input},
      update: (cache) => {
        cache.evict({fieldName: 'meals:{}'});
      },
    });
    if (res && res.errors && res.errors.length > 0) {
      setState({...initialState, loading: false, error: true});
      return;
    }
    if (res.data?.addMeal?.id) {
      setState({...initialState, loading: false, result: res.data.addMeal});
      mealsStore.dispatch(addMeal(res.data.addMeal));
    }
  };

  return (
    <div>
      <b>Add a meal</b>
      {state.error && <Message type='error' title='An error occured.' />}
      {state.loading && <Loading />}
      {state.result.id && <Message type='success' title='Saved.' />}

      <AddMealForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddMealWrapper;
