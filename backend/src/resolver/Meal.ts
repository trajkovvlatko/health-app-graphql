import {Resolver, Query, Arg, Int} from 'type-graphql';
import Meal from '../entity/Meal';

@Resolver(Meal)
export default class MealResolver {
  @Query(() => Meal, {nullable: true})
  meal(@Arg('id', () => Int) id: number): Promise<Meal> {
    return Meal.findOne(id, {
      relations: ['products'],
    });
  }

  @Query(() => [Meal], {nullable: true})
  meals(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
  ): Promise<Meal[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Meal.find({
      relations: ['products'],
      take,
      skip,
      order: {
        id: 'DESC',
      },
    });
  }
}
