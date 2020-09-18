import chai, {loader, authUser} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
import Weight from '../../src/entity/Weight';
let app: Express.Application;

describe('Weight resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('weights', () => {
    const query = () => {
      return `
        query Weights {
          weights {
            id
            weight
            measure
          }
        }
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        await create('weights', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({weights: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns weights: [] for weights not found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {weights: []}});
      });

      it('returns weights: [] for weights owned by other user', async () => {
        await create('weights', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {weights: []}});
      });

      it('returns weights array', async () => {
        const weight1 = await create('weights', {userId: user.id});
        const weight2 = await create('weights', {userId: user.id});
        await create('weights', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({
          data: {
            weights: [
              {
                id: weight2.id,
                weight: weight2.weight,
                measure: weight2.measure,
              },
              {
                id: weight1.id,
                weight: weight1.weight,
                measure: weight1.measure,
              },
            ],
          },
        });
      });
    });
  });

  describe('addWeight', () => {
    const mutation = (weight: number, measure: string) => {
      return `
        mutation AddWeight {
          addWeight(weight: ${weight}, measure: "${measure}") {
            weight {
              weight
              measure
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
          .send({query: mutation(123, 'kg')});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('creates and returns a new weight record', async () => {
        (await Weight.find()).length.should.eq(0);

        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: mutation(456, 'lb')});

        res.body.data.addWeight.weight.should.deep.eq({
          weight: 456,
          measure: 'lb',
        });

        const w = await Weight.find();
        w.length.should.eq(1);
        w[0].userId.should.eq(user.id);
      });
    });
  });
});
