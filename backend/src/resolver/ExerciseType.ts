import {Resolver, Query} from 'type-graphql';
import ExerciseType from '../entity/ExerciseType';

@Resolver(ExerciseType)
export default class ExerciseTypeResolver {
  // Example:
  // query ExerciseType {
  //   exerciseTypes {
  //     name
  //     image
  //     calories
  //   }
  // }
  @Query(() => [ExerciseType], {nullable: true})
  exerciseTypes(): Promise<ExerciseType[]> {
    return ExerciseType.find({
      where: {active: true},
      order: {id: 'DESC'},
    });
  }
}
