import chai, {authUser, loader} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
let app: Express.Application;

describe('User resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('profile', () => {
    const query = () => {
      return `
        query Profile {
          profile {
            id
            email
          }
        }
      `;
    };

    context('without a user', () => {
      it('returns an auth error when user is not logged in', async () => {
        await create('users', {});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({profile: null});
      });
    });

    context('with user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns profile null for inactive user', async () => {
        user.active = false;
        await user.save();
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.errors.length.should.eq(1);
        res.body.errors[0].message.should.eq('Not authenticated.');
        res.body.data.should.deep.eq({profile: null});
      });

      it('returns profile for active user', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.data.profile.should.deep.eq({id: user.id, email: user.email});
      });
    });
  });

  describe('login', () => {
    const query = (email: string, password: string) => {
      return `
        mutation Login {
          login (email: "${email}", password: "${password}") {
            user {
              email
            }
          }
        }
      `;
    };

    it('returns null for inactive user', async () => {
      const user = await create('users', {active: false});
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query(user.email, user.password)});
      res.body.data.login.should.deep.eq({user: null});
    });

    it('returns email for successful login', async () => {
      const user = await create('users', {});

      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query(user.email, user.password)});

      res.body.data.login.user.should.deep.eq({email: user.email});
      res.header['set-cookie'][0].should.contain(process.env.COOKIE_NAME);
    });
  });

  describe('register', () => {
    const query = (email: string, password: string) => {
      return `
        mutation Register {
          register (email: "${email}", password: "${password}") {
            user {
              email
            }
            error
          }
        }
      `;
    };

    it('returns an error for invalid email', async () => {
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query('  ', 'password')});
      res.body.data.should.deep.eq({
        register: {user: null, error: 'Invalid email.'},
      });
    });

    it('returns an error for invalid password', async () => {
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query('email', '  ')});
      res.body.data.should.deep.eq({
        register: {user: null, error: 'Invalid password.'},
      });
    });

    it('returns email for successful register', async () => {
      const res = await chai
        .request(app)
        .post('/graphql')
        .send({query: query('email', 'password')});

      res.body.data.register.should.deep.eq({
        error: null,
        user: {email: 'email'},
      });

      res.header['set-cookie'][0].should.contain(process.env.COOKIE_NAME);
    });
  });
});
