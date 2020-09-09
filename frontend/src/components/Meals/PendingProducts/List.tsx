import React from 'react';
import MealPendingProductsItem from './Item';

function MealPendingProductsList() {
  const a = [1, 2, 3];
  return (
    <div>
      {a.map((n: number) => (
        <MealPendingProductsItem key={n} n={n} />
      ))}
    </div>
  );
}

export default MealPendingProductsList;
