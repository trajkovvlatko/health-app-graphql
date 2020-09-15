import chai, {loader, authUser} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
let app: Express.Application;

describe('Meal resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('meal', () => {
    const query = (id: number) => {
      return `
        query Meal {
          meal(id: ${id}) {
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
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        await create('meals', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query(1)});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({meal: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns meal null for meal not found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(1)});
        res.body.should.deep.eq({data: {meal: null}});
      });

      it('returns meal null for meal owned by other user', async () => {
        const meal = await create('meals', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(meal.id)});
        res.body.should.deep.eq({data: {meal: null}});
      });

      it('returns meal data', async () => {
        const meal = await create('meals', {userId: user.id});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(meal.id)});
        res.body.should.deep.eq({
          data: {
            meal: {
              mealType: {
                name: meal.mealType.name,
              },
              mealProducts: [
                {
                  amount: meal.mealProducts[0].amount,
                  product: {
                    name: meal.mealProducts[0].product.name,
                    measure: meal.mealProducts[0].product.measure,
                    calories: meal.mealProducts[0].product.calories,
                  },
                },
              ],
            },
          },
        });
      });
    });
  });
});
