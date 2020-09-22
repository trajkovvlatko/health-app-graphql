import {Field, ObjectType} from 'type-graphql';
import Exercise from './Exercise';
import GlucoseLevel from './GlucoseLevel';
import Meal from './Meal';
import Weight from './Weight';

@ObjectType()
export default class Chart {
  @Field(() => [Exercise])
  exercises: Exercise[];

  @Field(() => [GlucoseLevel])
  glucoseLevels: GlucoseLevel[];

  @Field(() => [Weight])
  weights: Weight[];

  @Field(() => [Meal])
  meals: Meal[];
}
