import chai, {loader, authUser} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
import Exercise from '../../src/entity/Exercise';
let app: Express.Application;

describe('Exercise resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('exercise', () => {
    const query = (id: number) => {
      return `
        query Exercise {
          exercise(id: ${id}) {
            id
            exerciseType {
              name
              image
              calories
            }
            duration
            intensity
          }
        }
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        const exercise = await create('exercises', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query(exercise.id)});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({exercise: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns exercise null for exercise not found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(-1)});
        res.body.should.deep.eq({data: {exercise: null}});
      });

      it('returns exercise null for exercise owned by other user', async () => {
        await create('exercises', {userId: user.id});
        const exercise = await create('exercises', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(exercise.id)});
        res.body.should.deep.eq({data: {exercise: null}});
      });

      it('returns exercise data', async () => {
        const exercise = await create('exercises', {userId: user.id});
        await create('exercises', {userId: user.id});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(exercise.id)});
        res.body.should.deep.eq({
          data: {
            exercise: {
              id: exercise.id,
              exerciseType: {
                name: exercise.exerciseType.name,
                image: exercise.exerciseType.image,
                calories: exercise.exerciseType.calories,
              },
              duration: exercise.duration,
              intensity: exercise.intensity,
            },
          },
        });
      });

      it('returns exercise only from active exercise types', async () => {
        const inactiveExerciseType = await create('exercise_types', {
          active: false,
        });
        const exercise1 = await create('exercises', {userId: user.id});
        const exercise2 = await create('exercises', {
          exerciseTypeId: inactiveExerciseType.id,
          userId: user.id,
        });

        const res1 = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(exercise1.id)});
        res1.body.data.exercise.should.not.eq(null);

        const res2 = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query(exercise2.id)});
        res2.body.data.should.deep.eq({exercise: null});
      });
    });
  });

  describe('exercises', () => {
    const query = () => {
      return `
        query Exercises {
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
        }
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        await create('exercises', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({exercises: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns exercises: [] for exercises not found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {exercises: []}});
      });

      it('returns exercises: [] for exercises owned by other user', async () => {
        await create('exercises', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {exercises: []}});
      });

      it('returns exercises array', async () => {
        const exercise1 = await create('exercises', {userId: user.id});
        const exercise2 = await create('exercises', {userId: user.id});
        await create('exercises', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({
          data: {
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
          },
        });
      });

      it('returns only exercises from active exercise types', async () => {
        const inactiveExerciseType = await create('exercise_types', {
          active: false,
        });
        const exercise1 = await create('exercises', {userId: user.id});
        await create('exercises', {
          exerciseTypeId: inactiveExerciseType.id,
          userId: user.id,
        });
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});

        res.body.data.exercises.length.should.eq(1);
        res.body.data.exercises[0].exerciseType.name.should.eq(
          exercise1.exerciseType.name,
        );
      });
    });
  });

  describe('addExercise', () => {
    const mutation = (
      exerciseTypeId: number,
      duration: number,
      intensity: number,
    ) => {
      return `
        mutation AddExercise {
          addExercise(
            input: {
              exerciseTypeId: ${exerciseTypeId}
              duration: ${duration}
              intensity: ${intensity}
            }
          ) {
            exerciseType {
              name
              image
              calories
            }
            duration
            intensity
          }
        }
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        const exerciseType = await create('exercise_types', {});

        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: mutation(exerciseType.id, 10, 20)});
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

      it('creates and returns a new exercise record', async () => {
        (await Exercise.find()).length.should.eq(0);

        const exerciseType = await create('exercise_types', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: mutation(exerciseType.id, 10, 20)});

        res.body.data.addExercise.should.deep.eq({
          exerciseType: {
            name: exerciseType.name,
            image: exerciseType.image,
            calories: exerciseType.calories,
          },
          duration: 10,
          intensity: 20,
        });

        (await Exercise.find()).length.should.eq(1);
      });

      it('creates exercises for active exercise types only', async () => {
        (await Exercise.find()).length.should.eq(0);

        const exerciseType = await create('exercise_types', {active: false});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: mutation(exerciseType.id, 10, 20)});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Invalid exercise type.');

        (await Exercise.find()).length.should.eq(0);
      });
    });
  });
});
