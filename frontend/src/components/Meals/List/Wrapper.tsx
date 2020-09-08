import React from 'react';
import {useApolloClient} from '@apollo/client';
import {Meal, useMealsQuery} from 'generated/graphql';
import './Wrapper.scss';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';

function ListMealsWrapper() {
  const {data, error, loading} = useMealsQuery({
    client: useApolloClient(),
    variables: {
      skip: 0,
      take: 10,
    },
  });

  const list = data?.meals;

  return (
    <div>
      <h3>Today:</h3>
      {loading && <Loading />}
      {error && <Message type='error' title='Cannot fetch meals.' />}

      {list && list.map((m: Meal) => m.mealType).join(', ')}
    </div>
  );
}

export default ListMealsWrapper;
