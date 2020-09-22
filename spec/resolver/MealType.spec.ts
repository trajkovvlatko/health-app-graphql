import chai, {loader} from '../spec_helper';
import create from '../factories';
let app: Express.Application;

describe('MealType resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('mealTypes', () => {
    const query = () => {
      return `
        query MealType {
          mealTypes {
            id
            name
          }
        }
      `;
    };

    it('returns an empty list if no meal type is found', async () => {
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query()});
      res.body.data.should.deep.eq({mealTypes: []});
    });

    it('returns a list of active meal types', async () => {
      const mealType1 = await create('meal_types', {});
      const mealType2 = await create('meal_types', {});
      await create('meal_types', {active: false});
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query()});
      res.body.data.should.deep.eq({
        mealTypes: [
          {
            id: mealType2.id,
            name: mealType2.name,
          },
          {
            id: mealType1.id,
            name: mealType1.name,
          },
        ],
      });
    });
  });
});
