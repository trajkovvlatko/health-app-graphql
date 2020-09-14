import {MealTypeFragment} from 'generated/graphql';
import {setMealType} from 'redux/actions/MealType';
import mealType from './MealType';

describe('when action.type is MEAL_TYPE/SET', () => {
  it('sets a new meal type when the store is null', () => {
    const newMealType: MealTypeFragment = {id: 1, name: 'meal type 1'};
    const res = mealType(null, setMealType(newMealType));
    expect(res).toEqual(newMealType);
  });

  it('overwrites any existing state', () => {
    const newMealType: MealTypeFragment = {id: 2, name: 'meal type 2'};
    const initialState = {id: 123, name: 'old meal type 123'};
    const res = mealType(initialState, setMealType(newMealType));
    expect(res).toEqual(newMealType);
  });
});
