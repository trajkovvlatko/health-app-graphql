import React, {useState} from 'react';
import './Form.scss';
import {useMealTypeQuery} from 'generated/graphql';
import {useApolloClient} from '@apollo/client';
import store from 'redux/Store';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import MealTypeItem from './Item';
import {setMealType} from 'redux/actions/MealType';
import IMealType from 'interfaces/IMealType';

function MealTypeForm() {
  const [activeId, setActiveId] = useState<null | number>(null);

  store.subscribe(() => {
    const activeId = store.getState().mealType?.id;
    setActiveId(activeId || null);
  });

  const {data, error, loading} = useMealTypeQuery({
    client: useApolloClient(),
  });

  const onClick = (mealType: IMealType) => {
    store.dispatch(setMealType(mealType));
    setActiveId(mealType.id);
  };

  return (
    <div>
      <h2>Meal type:</h2>
      {error && <Message type='error' title='Cannot fetch meal types.' />}
      {loading && <Loading />}
      {data?.mealTypes?.map((m) => (
        <MealTypeItem
          key={`meal-type-key-${m.name}`}
          mealType={{id: m.id, name: m.name}}
          onClick={onClick}
          active={activeId === m.id}
        />
      ))}
    </div>
  );
}

export default MealTypeForm;
