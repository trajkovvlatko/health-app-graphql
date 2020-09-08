import React, {useEffect, useState} from 'react';
import {useApolloClient} from '@apollo/client';
import {Meal, useMealsLazyQuery} from 'generated/graphql';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import mealsStore from 'redux/stores/Meal';
import IMeal from 'interfaces/IMeal';
import {setMeals} from 'redux/actions/Meals';

function ListMealsWrapper() {
  const [mealsList, setMealsList] = useState<IMeal[]>([]);
  mealsStore.subscribe(() => setMealsList(mealsStore.getState().mealsReducer));

  const [loadMeals, {error, loading}] = useMealsLazyQuery({
    client: useApolloClient(),
    onCompleted: (res) => {
      if (res.meals) {
        mealsStore.dispatch(setMeals(res.meals));
      }
    },
  });

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  return (
    <div>
      <h3>Today:</h3>
      {loading && <Loading />}
      {error && <Message type='error' title='Cannot fetch meals.' />}

      {mealsList && mealsList.map((m: Meal) => m.mealType).join(', ')}
    </div>
  );
}

export default ListMealsWrapper;
