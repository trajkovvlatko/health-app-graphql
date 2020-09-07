import React from 'react';
import orderStore from 'pages/Order/store/Order';
import {removeFromOrder} from 'pages/Order/actions/Order';

interface IProps {
  id: number;
}

function ProductItem(props: IProps) {
  const id = props.id;

  const onRemove = () => {
    orderStore.dispatch(removeFromOrder(id));
  };

  return (
    <div key={`product-${id}`} onClick={onRemove}>
      Product {id}
    </div>
  );
}

export default ProductItem;
