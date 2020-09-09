import React from 'react';

interface IProps {
  n: number;
}

function MealPendingProductsItem(props: IProps) {
  const {n} = props;
  return <div>{n}</div>;
}

export default MealPendingProductsItem;
