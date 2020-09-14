import {
  addMeal,
  removeMeal,
  setMeals,
  addPendingProduct,
  clearPendingProducts,
} from 'redux/actions/Meals';
import meals from './Meals';
import {MealFragment} from 'generated/graphql';

describe('when action.type is MEALS/ADD', () => {
  it('returns the input value as array when the initial is empty', () => {
    const initialState = {stored: [], pending: []};
    const newMeal: MealFragment = {
      id: 1,
      mealType: {
        id: 2,
        name: 'breakfast',
      },
      mealProducts: [
        {
          id: 3,
          amount: 3,
          createdAt: '123123',
          product: {
            id: 4,
            name: 'product name',
            measure: 'g',
            calories: 100,
          },
        },
      ],
    };
    const res = meals(initialState, addMeal(newMeal));
    expect(res.stored.length).toEqual(1);
    expect(res.stored).toEqual([newMeal]);
    expect(res.pending).toEqual([]);
  });

  // it('appends to the initial value when it already has elements', () => {
  //   const res = meals([1, 2, 3], addMeal(4));
  //   expect(res).toEqual([1, 2, 3, 4]);
  // });
  //
  // it('allows duplicates', () => {
  //   const res = meals([1, 2, 3], addMeal(2));
  //   expect(res).toEqual([1, 2, 3, 2]);
  // });
});

// describe('ORDER_REMOVE', () => {
//   it('returns an empty array if the initial value is empty', () => {
//     const res = meals([], removeFromOrder(1));
//     expect(res).toEqual([]);
//   });
//
//   it('removes from the initial value', () => {
//     const res = meals([1, 2, 3], removeFromOrder(2));
//     expect(res).toEqual([1, 3]);
//   });
//
//   it('returns the initial value if the input is not found', () => {
//     const res = meals([1, 2, 3], removeFromOrder(4));
//     expect(res).toEqual([1, 2, 3]);
//   });
// });
