import chai, {loader, authUser} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
import Exercise from '../../src/entity/Exercise';
import Meal from '../../src/entity/Meal';
import Weight from '../../src/entity/Weight';
import GlucoseLevel from '../../src/entity/GlucoseLevel';
let app: Express.Application;

describe('Chart resolver', () => {
  let exercise1: Exercise,
    exercise2: Exercise,
    meal1: Meal,
    meal2: Meal,
    weight1: Weight,
    weight2: Weight,
    glucoseLevel1: GlucoseLevel,
    glucoseLevel2: GlucoseLevel,
    user: User,
    cookie: string;

  beforeEach(async () => {
    app = await loader();
    user = await create('users', {});
    cookie = await authUser(user);
    exercise1 = await create('exercises', {userId: user.id});
    exercise2 = await create('exercises', {userId: user.id});
    meal1 = await create('meals', {userId: user.id});
    meal2 = await create('meals', {userId: user.id});
    weight1 = await create('weights', {userId: user.id});
    weight2 = await create('weights', {userId: user.id});
    glucoseLevel1 = await create('glucose_levels', {userId: user.id});
    glucoseLevel2 = await create('glucose_levels', {userId: user.id});

    await create('meals', {});
    await create('exercises', {});
    await create('weights', {});
    await create('glucose_levels', {});
  });

  describe('charts', () => {
    const query = () => {
      return `
        query Chart {
          charts {
            exercises {
              id
              exerciseType {
                name
                image
                calories
              }
              duration
              intensity
            }
            glucoseLevels {
              id
              level
            }
            weights {
              weight
            }
            meals {
              mealType {
                name
              }
              mealProducts {
                amount
                product {
                  name
                  measure
                  calories
                }
              }
            }
          }
        }
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});

        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({charts: null});
      });
    });

    context('with user', () => {
      it('returns all data for the user', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});

        res.body.data.charts.should.deep.eq({
          exercises: [
            {
              id: exercise2.id,
              exerciseType: {
                name: exercise2.exerciseType.name,
                image: exercise2.exerciseType.image,
                calories: exercise2.exerciseType.calories,
              },
              duration: exercise2.duration,
              intensity: exercise2.intensity,
            },
            {
              id: exercise1.id,
              exerciseType: {
                name: exercise1.exerciseType.name,
                image: exercise1.exerciseType.image,
                calories: exercise1.exerciseType.calories,
              },
              duration: exercise1.duration,
              intensity: exercise1.intensity,
            },
          ],
          glucoseLevels: [
            {
              id: glucoseLevel2.id,
              level: glucoseLevel2.level,
            },
            {
              id: glucoseLevel1.id,
              level: glucoseLevel1.level,
            },
          ],
          weights: [{weight: weight2.weight}, {weight: weight1.weight}],
          meals: [
            {
              mealType: {
                name: meal2.mealType.name,
              },
              mealProducts: [
                {
                  amount: meal2.mealProducts[0].amount,
                  product: {
                    name: meal2.mealProducts[0].product.name,
                    measure: meal2.mealProducts[0].product.measure,
                    calories: meal2.mealProducts[0].product.calories,
                  },
                },
              ],
            },
            {
              mealType: {
                name: meal1.mealType.name,
              },
              mealProducts: [
                {
                  amount: meal1.mealProducts[0].amount,
                  product: {
                    name: meal1.mealProducts[0].product.name,
                    measure: meal1.mealProducts[0].product.measure,
                    calories: meal1.mealProducts[0].product.calories,
                  },
                },
              ],
            },
          ],
        });
      });
    });
  });
});
