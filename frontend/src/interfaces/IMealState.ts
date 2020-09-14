import {MealFragment} from 'generated/graphql';
import IMealProduct from 'interfaces/IMealProduct';

export default interface IMealsState {
  stored: MealFragment[];
  pending: IMealProduct[];
}
