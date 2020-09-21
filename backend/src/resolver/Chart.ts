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
import TTimeSeriesRow from '../types/TTimeSeriesRow';

interface IMappedResponse {
  timestamp: number;
  date: string;
  value: number;
}

interface IForecastResponse {
  glucoseLevels: IMappedResponse[];
  weights: IMappedResponse[];
  meals: IMappedResponse[];
  exercises: IMappedResponse[];
}

@ObjectType()
class MappedResponse {
  @Field(() => Number)
  timestamp: number;

  @Field(() => String)
  date: string;

  @Field(() => Number)
  value: number;
}

@ObjectType()
class ForecastResponse {
  @Field(() => [MappedResponse])
  glucoseLevels: IMappedResponse[];

  @Field(() => [MappedResponse])
  weights: IMappedResponse[];

  @Field(() => [MappedResponse])
  meals: IMappedResponse[];

  @Field(() => [MappedResponse])
  exercises: IMappedResponse[];
}

const extendList = (data: TTimeSeriesRow[]): TTimeSeriesRow[] => {
  if (data.length < 5) {
    return data;
  }
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

const map = (data: TTimeSeriesRow[]): IMappedResponse[] => {
  return data.map((row: TTimeSeriesRow) => {
    return {
      timestamp: row[0].getTime(),
      date: row[0].toDateString(),
      value: row[1],
    };
  });
};

@Resolver(Exercise)
export default class ChartResolver {
  // Example:
  // query Chart {
  //   forecast {
  //     exercises {
  //       timestamp
  //       date
  //       value
  //     }
  //     meals {
  //       timestamp
  //       date
  //       value
  //     }
  //     weights {
  //       timestamp
  //       date
  //       value
  //     }
  //     glucoseLevels {
  //       timestamp
  //       date
  //       value
  //     }
  //   }
  // }
  @Query(() => ForecastResponse, {nullable: true})
  @UseMiddleware(withUser)
  async forecast(@Ctx() {req}: TContext): Promise<IForecastResponse> {
    const glucoseLevels = await GlucoseLevel.getTimeSeries(req.user.id);
    const weights = await Weight.getTimeSeries(req.user.id);
    const meals = await Meal.getTimeSeries(req.user.id);
    const exercises = await Exercise.getTimeSeries(req.user.id);

    return {
      glucoseLevels: map(extendList(glucoseLevels)),
      weights: map(extendList(weights)),
      meals: map(extendList(meals)),
      exercises: map(extendList(exercises)),
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
