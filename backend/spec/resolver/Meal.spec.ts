import chai, {loader, authUser} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
import MealProduct from '../../src/entity/MealProduct';
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

      it('returns only active products for a meal', async () => {
        const meal = await create('meals', {userId: user.id});
        const inactiveProduct = await create('products', {active: false});
        const mealProduct = new MealProduct();
        mealProduct.meal = meal;
        mealProduct.product = inactiveProduct;
        mealProduct.amount = 456;
        await mealProduct.save();

        const mealProducts = await MealProduct.find({where: {meal: meal}});
        mealProducts.length.should.eq(2);

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

      it('returns meal only from active meal types', async () => {
        // TODO
      });
    });
  });

  describe('meals', () => {
    const query = () => {
      return `
        query Meals {
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
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        await create('meals', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({meals: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns meals: [] for meal not found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {meals: []}});
      });

      it('returns meals: [] for meals owned by other user', async () => {
        await create('meals', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {meals: []}});
      });

      it('returns meals array', async () => {
        const meal1 = await create('meals', {userId: user.id});
        const meal2 = await create('meals', {userId: user.id});
        await create('meals', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({
          data: {
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
          },
        });
      });

      it('returns only active products for meals', async () => {
        const meal = await create('meals', {userId: user.id});
        const inactiveProduct = await create('products', {active: false});
        const mealProduct = new MealProduct();
        mealProduct.meal = meal;
        mealProduct.product = inactiveProduct;
        mealProduct.amount = 456;
        await mealProduct.save();

        const mealProducts = await MealProduct.find({where: {meal: meal}});
        mealProducts.length.should.eq(2);

        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});

        res.body.data.meals.length.should.eq(1);
        res.body.data.meals[0].mealProducts.length.should.eq(1);
        res.body.data.meals[0].mealProducts[0].product.name.should.eq(
          meal.mealProducts[0].product.name,
        );
      });

      it('returns only meals from active meal types', async () => {
        // TODO
      });
    });
  });
});
