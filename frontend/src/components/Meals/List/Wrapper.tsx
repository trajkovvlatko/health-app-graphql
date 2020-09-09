import React, {useEffect, useState} from 'react';
import {useApolloClient} from '@apollo/client';
import {MealFragment, useMealsLazyQuery} from 'generated/graphql';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import mealsStore from 'redux/stores/Meal';
import {setMeals} from 'redux/actions/Meals';

function ListMealsWrapper() {
  const [mealsList, setMealsList] = useState<MealFragment[]>([]);
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
  console.log(mealsList);

  return (
    <div>
      <h3>Today:</h3>
      {loading && <Loading />}
      {error && <Message type='error' title='Cannot fetch meals.' />}

      {mealsList && mealsList.map((m: MealFragment) => m.id).join(', ')}
    </div>
  );
}

export default ListMealsWrapper;
