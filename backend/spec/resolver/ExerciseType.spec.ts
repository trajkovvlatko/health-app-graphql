import chai, {loader} from '../spec_helper';
import create from '../factories';
let app: Express.Application;

describe('ExerciseType resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('exerciseTypes', () => {
    const query = () => {
      return `
        query ExerciseType {
          exerciseTypes {
            id
            name
            image
            calories
          }
        }
      `;
    };

    it('returns an empty list if no exercise type is found', async () => {
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query()});
      res.body.data.should.deep.eq({exerciseTypes: []});
    });

    it('returns a list of active exercise types', async () => {
      const exerciseType1 = await create('exercise_types', {});
      const exerciseType2 = await create('exercise_types', {});
      await create('exercise_types', {active: false});
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query()});
      res.body.data.should.deep.eq({
        exerciseTypes: [
          {
            id: exerciseType2.id,
            name: exerciseType2.name,
            image: exerciseType2.image,
            calories: exerciseType2.calories,
          },
          {
            id: exerciseType1.id,
            name: exerciseType1.name,
            image: exerciseType1.image,
            calories: exerciseType1.calories,
          },
        ],
      });
    });
  });
});
