import IMealProduct from 'interfaces/IMealProduct';
import React from 'react';

interface IProps {
  product: IMealProduct;
}

function MealPendingProductsItem(props: IProps) {
  const {product} = props;
  return (
    <div>
      {product.productName} - {product.amount}
    </div>
  );
}

export default MealPendingProductsItem;
