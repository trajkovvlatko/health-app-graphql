import React, {useEffect, useState} from 'react';
import {useApolloClient} from '@apollo/client';
import {MealFragment, useMealsLazyQuery} from 'generated/graphql';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import store from 'redux/Store';
import {setMeals} from 'redux/actions/Meals';
import ListMealsRow from './Row';

function MealsListWrapper() {
  const [mealsList, setMealsList] = useState<MealFragment[]>(
    store.getState().meals.stored,
  );

  const [loadMeals, {error, loading}] = useMealsLazyQuery({
    client: useApolloClient(),
    onCompleted: (res) => {
      if (res.meals) {
        store.dispatch(setMeals(res.meals));
      }
    },
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setMealsList(store.getState().meals.stored);
    });
    loadMeals();
    return unsubscribe;
  }, [loadMeals]);

  return (
    <div>
      <h3>Meals list:</h3>
      {loading && <Loading />}
      {error && <Message type='error' title='Cannot fetch meals.' />}

      {mealsList &&
        mealsList.map((meal: MealFragment) => (
          <ListMealsRow key={`meal-key-${meal.id}`} meal={meal} />
        ))}
    </div>
  );
}

export default MealsListWrapper;
