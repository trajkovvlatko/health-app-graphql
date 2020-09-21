import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql';
import Chart from '../entity/Chart';
import Exercise from '../entity/Exercise';
import GlucoseLevel from '../entity/GlucoseLevel';
import Meal from '../entity/Meal';
import Weight from '../entity/Weight';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';
import timeseries from 'timeseries-analysis';

@ObjectType()
class ChartResponse {
  @Field(() => Number)
  a: number;
}

@Resolver(Exercise)
export default class ChartResolver {
  @Query(() => ChartResponse, {nullable: true})
  blah(): ChartResponse {
    const data = [
      ['2012-01-01', 1],
      ['2012-01-02', 1],
      ['2012-01-03', 2],
      ['2012-01-04', 2],
      ['2012-01-05', 3],
      ['2012-01-06', 3],
      ['2012-01-07', 4],
      ['2012-01-08', 4],
      ['2012-01-09', 5],
      ['2012-01-10', 5],
      ['2012-01-11', 6],
      ['2012-01-12', 6],
      ['2012-01-13', 7],
      ['2012-01-14', 7],
    ];

    for (let i = 0; i < 5; i++) {
      const t = new timeseries.main(data);
      const coeffs = t.ARMaxEntropy({
        data: t.data,
      });
      const length = data.length - 1;

      let forecast = 0;
      for (let j = 0; j < coeffs.length; j++) {
        forecast -= t.data[length - j][1] * coeffs[j];
      }
      const nextIndex = data.length;
      const nextDate = nextIndex + 1;
      data[nextIndex] = [`2012-01-${nextDate}`, Math.round(forecast)];
    }

    console.log('forecast', data);

    return {
      a: 1,
    };
  }

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
    const weights = await Weight.find({
      where: {userId: req.user.id},
      order: {
        id: 'DESC',
      },
    });
    const glucoseLevels = await GlucoseLevel.find({
      where: {userId: req.user.id},
      order: {
        id: 'DESC',
      },
    });
    return {
      exercises,
      glucoseLevels,
      weights,
      meals,
    };
  }
}
