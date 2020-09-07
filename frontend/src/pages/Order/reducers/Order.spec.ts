import {addToOrder, removeFromOrder} from '../actions/Order';
import orderReducer from './Order';

describe('ORDER_ADD', () => {
  it('returns the input value as array when the initial is empty', () => {
    const res = orderReducer([], addToOrder(1));
    expect(res).toEqual([1]);
  });

  it('appends to the initial value when it already has elements', () => {
    const res = orderReducer([1, 2, 3], addToOrder(4));
    expect(res).toEqual([1, 2, 3, 4]);
  });

  it('allows duplicates', () => {
    const res = orderReducer([1, 2, 3], addToOrder(2));
    expect(res).toEqual([1, 2, 3, 2]);
  });
});

describe('ORDER_REMOVE', () => {
  it('returns an empty array if the initial value is empty', () => {
    const res = orderReducer([], removeFromOrder(1));
    expect(res).toEqual([]);
  });

  it('removes from the initial value', () => {
    const res = orderReducer([1, 2, 3], removeFromOrder(2));
    expect(res).toEqual([1, 3]);
  });

  it('returns the initial value if the input is not found', () => {
    const res = orderReducer([1, 2, 3], removeFromOrder(4));
    expect(res).toEqual([1, 2, 3]);
  });
});
