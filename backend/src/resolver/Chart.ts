import {Resolver, Query, UseMiddleware, Ctx} from 'type-graphql';
import Chart from '../entity/Chart';
import Exercise from '../entity/Exercise';
import GlucoseLevel from '../entity/GlucoseLevel';
import Meal from '../entity/Meal';
import Weight from '../entity/Weight';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@Resolver(Exercise)
export default class ChartResolver {
  // Example:
  // query Chart {
  //   charts {
  //     exercises {
  //       id
  //       exerciseType {
  //         name
  //         image
  //         calories
  //       }
  //       duration
  //       intensity
  //     }
  //     glucoseLevels {
  //       id
  //       level
  //       createdAt
  //     }
  //     weights {
  //       weight
  //       createdAt
  //     }
  //     meals {
  //       mealType {
  //         name
  //       }
  //       mealProducts {
  //         amount
  //         product {
  //           name
  //           measure
  //           calories
  //         }
  //       }
  //     }
  //   }
  // }
  @Query(() => Chart, {nullable: true})
  @UseMiddleware(withUser)
  async charts(@Ctx() {req}: TContext): Promise<Chart> {
    // TODO: Await all of them at once

    const meals = await Meal.getFullRecords(req.user.id);
    const exercises = await Exercise.getFullRecords(req.user.id);
    const weights = await Weight.find({where: {userId: req.user.id}});
    const glucoseLevels = await GlucoseLevel.find({
      where: {userId: req.user.id},
    });
    return {
      exercises,
      glucoseLevels,
      weights,
      meals,
    };
  }
}
