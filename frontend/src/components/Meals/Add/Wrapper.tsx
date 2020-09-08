import React from 'react';
import AddMealForm from './Form';
import IForm from 'interfaces/IForm';
import './Wrapper.scss';
import {useRequest} from 'hooks/useRequest';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import mealsStore from 'redux/stores/Meal';
import {addMeal} from 'redux/actions/Meals';

function AddMealWrapper() {
  const {data, sendRequest} = useRequest();
  const url = `${process.env.REACT_APP_HOST}/meals`;

  const onSubmit = async (values: IForm) => {
    const formValues = new FormData();
    formValues.append('name', values.name);
    formValues.append('message', values.message);
    await sendRequest(url, 'POST', null, formValues);
  };

  if (data.results) {
    mealsStore.dispatch(addMeal(data.results));
  }

  return (
    <div>
      <b>Add a meal</b>
      {data.error && <Message type='error' title='An error occured.' />}
      {data.loading && <Loading />}
      {data.results?.success && <Message type='success' title='Saved.' />}

      <AddMealForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddMealWrapper;
