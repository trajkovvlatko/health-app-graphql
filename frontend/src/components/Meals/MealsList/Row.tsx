import {MealFragment, MealProductFragment} from 'generated/graphql';
import React from 'react';
import './Row.scss';

interface IProps {
  meal: MealFragment;
}

function ListMealsRow(props: IProps) {
  const {meal} = props;
  return (
    <div>
      <b>{meal.mealType.name}</b>:
      {meal.mealProducts.map((mp: MealProductFragment) => {
        return (
          <div key={`meal-product-key-${meal.id}-${mp.product.name}`}>
            <span>{mp.product.name}</span>:{' '}
            <span>
              {mp.amount} {mp.product.measure}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ListMealsRow;
