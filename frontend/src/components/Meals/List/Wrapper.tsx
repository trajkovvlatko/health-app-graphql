import React, {useEffect, useState} from 'react';
import {useApolloClient} from '@apollo/client';
import {MealFragment, useMealsLazyQuery} from 'generated/graphql';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import mealsStore from 'redux/stores/Meal';
import {setMeals} from 'redux/actions/Meals';
import ListMealsRow from './Row';

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

export default ListMealsWrapper;
