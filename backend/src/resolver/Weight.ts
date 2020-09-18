import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql';
import Weight from '../entity/Weight';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@ObjectType()
class WeightResponse {
  @Field(() => String, {nullable: true})
  error?: string;

  @Field(() => Weight, {nullable: true})
  weight?: Weight;
}

@Resolver(Weight)
export default class WeightResolver {
  // Example:
  // query Weights {
  //   weights(skip: 1, take: 5) {
  //     measure
  //     weight
  //     createdAt
  //   }
  // }
  @Query(() => [Weight], {nullable: true})
  @UseMiddleware(withUser)
  weights(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
    @Ctx() {req}: TContext,
  ): Promise<Weight[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Weight.find({
      where: {userId: req.user.id},
      skip,
      take,
      order: {id: 'DESC'},
    });
  }

  // Example:
  // mutation AddWeight {
  //   addWeight(measure: "kg", weight: 60) {
  //     weight {
  //       id
  //       measure
  //       weight
  //     }
  //   }
  // }
  @Mutation(() => WeightResponse)
  @UseMiddleware(withUser)
  async addWeight(
    @Arg('weight', () => Int, {nullable: false}) weight: number,
    @Arg('measure', () => String, {nullable: false}) measure: string,
    @Ctx() {req}: TContext,
  ): Promise<WeightResponse> {
    const w = new Weight();
    w.userId = req.user.id;
    w.weight = weight;
    w.measure = measure;
    try {
      await w.save();
      return {weight: w};
    } catch (e) {
      return {error: 'Cannot save weight.'};
    }
  }
}
