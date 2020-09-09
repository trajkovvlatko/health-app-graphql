import React from 'react';
import './Form.scss';
import {useMealTypeQuery} from 'generated/graphql';
import {useApolloClient} from '@apollo/client';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';

function MealTypeForm() {
  const {data, error, loading} = useMealTypeQuery({
    client: useApolloClient(),
  });

  return (
    <div>
      <h2>Meal type:</h2>
      {error && <Message type='error' title='Cannot fetch meal types.' />}
      {loading && <Loading />}
      {data &&
        data.mealTypes &&
        data.mealTypes.map((m) => (
          <button key={`meal-type-key-${m.name}`}>{m.name}</button>
        ))}
    </div>
  );
}

export default MealTypeForm;
