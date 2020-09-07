import {addToOrder, removeFromOrder} from '../actions/Order';
import configureMockStore, {MockStore} from 'redux-mock-store';
import {ORDER_ADD, ORDER_REMOVE} from '../reducers/Order';

const mockStore = configureMockStore();
let orderStore: MockStore;

beforeEach(() => {
  orderStore = mockStore([]);
});

describe('ORDER_ADD', () => {
  it('dispatches ORDER_ADD action', () => {
    orderStore.dispatch(addToOrder(1));
    expect(orderStore.getActions()).toEqual([{type: ORDER_ADD, productId: 1}]);
  });

  it('dispatches ORDER_ADD multiple times', () => {
    orderStore.dispatch(addToOrder(1));
    orderStore.dispatch(addToOrder(2));
    const expectedPayload = [
      {type: ORDER_ADD, productId: 1},
      {type: ORDER_ADD, productId: 2},
    ];
    expect(orderStore.getActions()).toEqual(expectedPayload);
  });
});

describe('ORDER_REMOVE', () => {
  it("doesn't fail if the store is empty", () => {
    orderStore.dispatch(removeFromOrder(1));
    expect(orderStore.getActions()).toEqual([
      {type: ORDER_REMOVE, productId: 1},
    ]);
  });

  it('dispatches ORDER_REMOVE multiple times', () => {
    orderStore = mockStore([1, 2, 3]);
    orderStore.dispatch(removeFromOrder(1));
    orderStore.dispatch(removeFromOrder(2));
    expect(orderStore.getActions()).toEqual([
      {type: ORDER_REMOVE, productId: 1},
      {type: ORDER_REMOVE, productId: 2},
    ]);
  });
});
