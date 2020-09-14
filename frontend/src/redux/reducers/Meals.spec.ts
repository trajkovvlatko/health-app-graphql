import {
  addMeal,
  removeMeal,
  setMeals,
  addPendingProduct,
  clearPendingProducts,
} from 'redux/actions/Meals';
import meals from './Meals';
import {MealFragment} from 'generated/graphql';
import IMealsState from 'interfaces/IMealState';
import IMealProduct from 'interfaces/IMealProduct';

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

describe('when action.type is MEALS/ADD', () => {
  it('adds a meal to the stored list when stored list is empty', () => {
    const initialState = {stored: [], pending: []};
    const res = meals(initialState, addMeal(newMeal));
    expect(res.stored.length).toEqual(1);
    expect(res.stored).toEqual([newMeal]);
    expect(res.pending).toEqual([]);
  });

  it('appends to the stored list when it has elements', () => {
    const storedMeal = {...newMeal, id: 123};
    const initialState = {stored: [storedMeal], pending: []};
    const res = meals(initialState, addMeal(newMeal));
    expect(res).toEqual({stored: [newMeal, storedMeal], pending: []});
    expect(res.stored.map((m) => m.id)).toEqual([1, 123]);
  });
});

describe('when action.type is MEALS/REMOVE', () => {
  let meal1: MealFragment, meal2: MealFragment, initialState: IMealsState;

  beforeEach(() => {
    meal1 = {...newMeal, id: 123};
    meal2 = {...newMeal, id: 456};
    initialState = {stored: [meal1, meal2], pending: []};
  });

  it('removes a meal from the stored list', () => {
    const res = meals(initialState, removeMeal(meal2.id));
    expect(res.stored.length).toEqual(1);
    expect(res).toEqual({stored: [meal1], pending: []});
  });

  it('does not remove anything if the meal is not found', () => {
    const res = meals(initialState, removeMeal(789));
    expect(res).toEqual({stored: [meal1, meal2], pending: []});
    expect(res.stored.map((m) => m.id)).toEqual([123, 456]);
  });
});

describe('when action.type is MEALS/SET', () => {
  let meal1: MealFragment,
    meal2: MealFragment,
    meal3: MealFragment,
    initialState: IMealsState;

  beforeEach(() => {
    meal1 = {...newMeal, id: 123};
    meal2 = {...newMeal, id: 456};
    meal3 = {...newMeal, id: 789};
    initialState = {stored: [meal1], pending: []};
  });

  it('sets the parameters as the new stored list', () => {
    const res = meals(initialState, setMeals([meal2, meal3]));
    expect(res.stored.length).toEqual(2);
    expect(res).toEqual({stored: [meal2, meal3], pending: []});
  });

  it('cleans the stored list with an empty array', () => {
    const res = meals(initialState, setMeals([]));
    expect(res).toEqual({stored: [], pending: []});
  });
});

describe('when action.type is MEAL_PRODUCT/ADD', () => {
  let meal1: MealFragment,
    initialState: IMealsState,
    product1: IMealProduct,
    product2: IMealProduct;

  beforeEach(() => {
    meal1 = {...newMeal, id: 123};
    initialState = {stored: [meal1], pending: []};
    product1 = {
      productId: 1,
      productName: 'product 1',
      amount: 3,
    };
    product2 = {
      productId: 2,
      productName: 'product 2',
      amount: 4,
    };
  });

  it('adds an item to the pending list when it is empty', () => {
    const res = meals(initialState, addPendingProduct(product1));
    expect(res).toEqual({stored: [meal1], pending: [product1]});
  });

  it('appends to the pending list if it has elements', () => {
    initialState.pending = [product1];
    const res = meals(initialState, addPendingProduct(product2));
    expect(res).toEqual({stored: [meal1], pending: [product2, product1]});
  });
});

describe('when action.type is MEAL_PRODUCT/CLEAR', () => {
  let meal1: MealFragment, initialState: IMealsState;

  beforeEach(() => {
    meal1 = {...newMeal, id: 123};
    initialState = {
      stored: [meal1],
      pending: [
        {
          productId: 1,
          productName: 'product 1',
          amount: 3,
        },
      ],
    };
  });

  it('clears the pending list', () => {
    const res = meals(initialState, clearPendingProducts());
    expect(res).toEqual({stored: [meal1], pending: []});
  });

  it('does not fail if the pending list is already empty', () => {
    initialState = {stored: [meal1], pending: []};
    const res = meals(initialState, clearPendingProducts());
    expect(res).toEqual({stored: [meal1], pending: []});
  });

  it('does not fail if the stored list is empty', () => {
    initialState.stored = [];
    const res = meals(initialState, clearPendingProducts());
    expect(res).toEqual({stored: [], pending: []});
  });
});
