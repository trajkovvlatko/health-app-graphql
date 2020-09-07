import {ORDER_ADD, ORDER_REMOVE} from 'pages/Order/reducers/Order';

export function addToOrder(productId: number) {
  return {
    type: ORDER_ADD,
    productId,
  };
}

export function removeFromOrder(productId: number) {
  return {
    type: ORDER_REMOVE,
    productId,
  };
}
