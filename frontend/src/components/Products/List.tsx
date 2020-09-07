import React, {useState} from 'react';
import ProductItem from './Item';
import orderStore from 'pages/Order/store/Order';

function ProductsList() {
  const [productIds, setProductIds] = useState<number[]>([]);
  orderStore.subscribe(() => setProductIds(orderStore.getState().orderReducer));

  return (
    <div>
      {productIds.map((id: number) => (
        <ProductItem id={id} />
      ))}
    </div>
  );
}

export default ProductsList;
