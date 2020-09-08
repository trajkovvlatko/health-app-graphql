import React, {useState} from 'react';
import AddMealForm from './Form';
import IForm from 'interfaces/IForm';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import mealsStore from 'redux/stores/Meal';
import {useAddMealMutation} from 'generated/graphql';
import {addMeal} from 'redux/actions/Meals';
import IMeal from 'interfaces/IMeal';

const initialState = {
  error: false,
  loading: false,
  success: false,
  result: {} as IMeal,
};

function AddMealWrapper() {
  const [state, setState] = useState(initialState);
  const [addMealMutation] = useAddMealMutation();

  const onSubmit = async (values: IForm) => {
    setState({...initialState, loading: true});
    const res = await addMealMutation({
      variables: {input: {mealType: values.name}},
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
