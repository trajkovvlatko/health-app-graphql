import {Resolver, Query, UseMiddleware, Ctx} from 'type-graphql';
import Chart from '../entity/Chart';
import Exercise from '../entity/Exercise';
import GlucoseLevel from '../entity/GlucoseLevel';
import Meal from '../entity/Meal';
import Weight from '../entity/Weight';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';
import timeseries from 'timeseries-analysis';

type TTimeSeriesRow = [Date, number];

const extendList = (data: TTimeSeriesRow[]) => {
  for (let i = 0; i < 5; i++) {
    const t = new timeseries.main(data);
    const coeffs = t.ARMaxEntropy({data: t.data});
    const length = data.length - 1;

    let forecast = 0;
    for (let j = 0; j < coeffs.length; j++) {
      forecast -= t.data[length - j][1] * coeffs[j];
    }
    const lastDate = data[data.length - 1][0];

    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);

    data.push([nextDate, Math.round(forecast)]);
  }
  return data;
};

@Resolver(Exercise)
export default class ChartResolver {
  @Query(() => [[String, Number]], {nullable: true})
  @UseMiddleware(withUser)
  async forecast(@Ctx() {req}: TContext): Promise<TTimeSeriesRow[]> {
    const glucoseLevels = await GlucoseLevel.getTimeSeries(req.user.id);
    const data = extendList(glucoseLevels);
    return data;
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
