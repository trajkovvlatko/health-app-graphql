import chai, {authUser, loader} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
import GlucoseLevel from '../../src/entity/GlucoseLevel';
let app: Express.Application;

describe('GlucoseLevel resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('glucoseLevels', () => {
    const query = () => {
      return `
        query GlucoseLevel {
          glucoseLevels {
            id
            level
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
        res.body.data.should.deep.eq({glucoseLevels: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns empty array for glucose levels not found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {glucoseLevels: []}});
      });

      it('returns empty array for levels owned by other user', async () => {
        await create('glucose_levels', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({data: {glucoseLevels: []}});
      });

      it('returns glucose levels array', async () => {
        const glucoseLevel1 = await create('glucose_levels', {userId: user.id});
        const glucoseLevel2 = await create('glucose_levels', {userId: user.id});
        await create('glucose_levels', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.should.deep.eq({
          data: {
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
          },
        });
      });
    });
  });

  describe('addGlucoseLevel', () => {
    const mutation = (level: number) => {
      return `
        mutation AddGlucoseLevel {
          addGlucoseLevel(level: ${level}) {
            level
          }
        }
      `;
    };

    context('without user', () => {
      it('returns an auth error when user is not logged in', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: mutation(123)});
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

      it('creates and returns a new glucose level record', async () => {
        (await GlucoseLevel.find()).length.should.eq(0);

        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: mutation(1234)});

        res.body.data.addGlucoseLevel.should.deep.eq({level: 1234});

        (await GlucoseLevel.find()).length.should.eq(1);
      });
    });
  });
});
