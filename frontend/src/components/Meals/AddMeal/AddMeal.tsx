import {useApolloClient} from '@apollo/client';
import {useAddMealMutation} from 'generated/graphql';
import IMealProduct from 'interfaces/IMealProduct';
import React from 'react';
import {addMeal, clearPendingProducts} from 'redux/actions/Meals';
import {setMealType} from 'redux/actions/MealType';
import store from 'redux/Store';

function AddMeal() {
  const [addMealMutation] = useAddMealMutation({
    client: useApolloClient(),
  });

  const onClick = async () => {
    const state = store.getState();
    const products = state.meals.pending.map((p: IMealProduct) => {
      return {
        productId: p.productId,
        amount: p.amount,
      };
    });
    const mealTypeId = state.mealType?.id;

    if (!mealTypeId) return alert('Set meal type first.');
    if (products.length === 0) return alert('Set products for this meal.');

    const input = {mealTypeId, products};
    const res = await addMealMutation({variables: {input}});

    if (res && res.errors && res.errors.length > 0) {
      return console.log('ERROR', res.errors);
    }

    if (res.data?.addMeal?.id) {
      store.dispatch(addMeal(res.data.addMeal));
      store.dispatch(clearPendingProducts());
      store.dispatch(setMealType(null));
    }
  };

  return <button onClick={onClick}>Add meal</button>;
}

export default AddMeal;
