import chai, {loader} from '../spec_helper';

describe('Meal resolver', () => {
  describe('meal', () => {
    it('returns an auth error when user is not logged in', async () => {
      const app = await loader();
      const query = `
        query Meal {
          meal(id: 1) {
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

      const res = await chai.request(app).post('/graphql').send({query: query});
      res.should.have.status(200);
      res.body.errors.length.should.eq(1);
      res.body.errors[0].message.should.eq('Not authenticated.');
      res.body.data.should.deep.eq({meal: null});
    });
  });
});
