import {Resolver, Query} from 'type-graphql';
import MealType from '../entity/MealType';

@Resolver(MealType)
export default class MealTypeResolver {
  // Example:
  // query MealType {
  //   mealTypes {
  //     name
  //   }
  // }
  @Query(() => [MealType], {nullable: true})
  mealTypes(): Promise<MealType[]> {
    return MealType.find({
      where: {active: true},
      order: {id: 'DESC'},
    });
  }
}
