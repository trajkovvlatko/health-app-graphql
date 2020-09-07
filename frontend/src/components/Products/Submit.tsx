import React from 'react';
import orderStore from 'pages/Order/store/Order';

function ProductsSubmit() {
  const onSubmit = () => {
    const productIds = orderStore.getState().orderReducer;
    alert(JSON.stringify(productIds));
  };

  return (
    <div>
      <button onClick={onSubmit}>Submit order</button>
    </div>
  );
}

export default ProductsSubmit;
