import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
  Float,
} from 'type-graphql';
import GlucoseLevel from '../entity/GlucoseLevel';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@Resolver(GlucoseLevel)
export default class GlucoseLevelResolver {
  // Example:
  // query GlucoseLevels {
  //   glucoseLevels(skip: 1, take: 5) {
  //     id
  //     level
  //     createdAt
  //   }
  // }
  @Query(() => [GlucoseLevel], {nullable: true})
  @UseMiddleware(withUser)
  glucoseLevels(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
    @Ctx() {req}: TContext,
  ): Promise<GlucoseLevel[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return GlucoseLevel.find({
      where: {userId: req.user.id},
      take,
      skip,
      order: {id: 'DESC'},
    });
  }

  // Example:
  // mutation AddGlucoseLevel {
  //   addGlucoseLevel(level: 123)
  //   {
  //     id
  //     level
  //     createdAt
  //   }
  // }
  @Mutation(() => GlucoseLevel)
  @UseMiddleware(withUser)
  async addGlucoseLevel(
    @Arg('level', () => Float) level: number,
    @Ctx() {req}: TContext,
  ): Promise<GlucoseLevel> {
    const glucose = new GlucoseLevel();
    glucose.userId = req.user.id;
    glucose.level = level;
    return glucose.save();
  }
}
