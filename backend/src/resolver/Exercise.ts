import {
  Resolver,
  Query,
  Arg,
  Int,
  InputType,
  Field,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import Exercise from '../entity/Exercise';
import ExerciseType from '../entity/ExerciseType';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@InputType()
class ExerciseInput {
  @Field()
  exerciseTypeId: number;

  @Field()
  duration: number;

  @Field()
  intensity: number;
}

@Resolver(Exercise)
export default class ExerciseResolver {
  // Example:
  // query Exercise {
  //   exercise(id: 1) {
  //     id
  //     exerciseType {
  //       name
  //       image
  //       calories
  //     }
  //     duration
  //     intensity
  //   }
  // }
  @Query(() => Exercise, {nullable: true})
  @UseMiddleware(withUser)
  exercise(
    @Arg('id', () => Int) id: number,
    @Ctx() {req}: TContext,
  ): Promise<Exercise> {
    return Exercise.getFullRecord(id, req.user.id);
  }

  // Example:
  // query Exercises {
  //   exercises(skip: 1, take: 5) {
  //     id
  //     exerciseType {
  //       name
  //       image
  //       calories
  //     }
  //     duration
  //     intensity
  //   }
  // }
  @Query(() => [Exercise], {nullable: true})
  @UseMiddleware(withUser)
  exercises(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
    @Ctx() {req}: TContext,
  ): Promise<Exercise[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Exercise.getFullRecords(req.user.id);
  }

  // Example:
  // mutation AddExercise {
  //   addExercise(
  //   input: {
  //     exerciseTypeId: 1,
  //     duration: 30,
  //     intensity: 5
  //   })
  //   {
  //     id
  //     exerciseType {
  //       name
  //       calories
  //     }
  //     duration
  //     intensity
  //     createdAt
  //   }
  // }
  @Mutation(() => Exercise)
  @UseMiddleware(withUser)
  async addExercise(
    @Arg('input') input: ExerciseInput,
    @Ctx() {req}: TContext,
  ): Promise<Exercise> {
    const exerciseType = await ExerciseType.findOne({
      where: {active: true, id: input.exerciseTypeId},
    });
    if (!exerciseType) throw new Error('Invalid exercise type.');

    const exercise = new Exercise();
    exercise.userId = req.user.id;
    exercise.exerciseTypeId = input.exerciseTypeId;
    exercise.intensity = input.intensity;
    exercise.duration = input.duration;
    await exercise.save();

    return Exercise.getFullRecord(exercise.id, req.user.id);
  }
}
