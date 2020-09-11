import IMealProduct from 'interfaces/IMealProduct';
import React, {useState} from 'react';
import store from 'redux/Store';
import MealPendingProductsItem from './Item';

function MealPendingProductsList() {
  const [list, setList] = useState(store.getState().meals.pending);
  store.subscribe(() => setList(store.getState().meals.pending));

  return (
    <div>
      {list.map((n: IMealProduct) => (
        <MealPendingProductsItem
          key={`pending-product-${n.productId}`}
          product={n}
        />
      ))}
    </div>
  );
}

export default MealPendingProductsList;
