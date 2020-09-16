import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import Weight from '../entity/Weight';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@Resolver(Weight)
export default class WeightResolver {
  // Example:
  // query Weights {
  //   weights(skip: 1, take: 5) {
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

    return Weight.find({where: {userId: req.user.id}, skip, take});
  }

  // Example:
  // mutation AddWeight {
  //   addWeight(measure: "kg", weight: 60) {
  //     id
  //     measure
  //     weight
  //   }
  // }
  @Mutation(() => Weight)
  @UseMiddleware(withUser)
  async addWeight(
    @Arg('weight', () => Int, {nullable: false}) weight: number,
    @Arg('measure', () => String, {nullable: false}) measure: string,
    @Ctx() {req}: TContext,
  ): Promise<Weight> {
    const w = new Weight();
    w.userId = req.user.id;
    w.weight = weight;
    w.measure = measure;
    return w.save();
  }
}
