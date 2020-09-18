import chai, {authUser, loader} from '../spec_helper';
import create from '../factories';
import User from '../../src/entity/User';
import Product from '../../src/entity/Product';
let app: Express.Application;

describe('Product resolver', () => {
  beforeEach(async () => {
    app = await loader();
  });

  describe('products', () => {
    const query = () => {
      return `
        query Product {
          products {
            id
            name
            measure
            calories
          }
        }
      `;
    };

    context('without a user', () => {
      it('returns an empty list if no products are found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});
        res.body.data.should.deep.eq({products: []});
      });

      it('returns a list of active products without a user id', async () => {
        const product1 = await create('products', {});
        const product2 = await create('products', {});
        const user = await create('users', {});
        await create('products', {userId: user.id});
        await create('products', {active: false});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query()});
        res.body.data.products.length.should.eq(2);
        res.body.data.should.deep.eq({
          products: [
            {
              id: product2.id,
              name: product2.name,
              measure: product2.measure,
              calories: product2.calories,
            },
            {
              id: product1.id,
              name: product1.name,
              measure: product1.measure,
              calories: product1.calories,
            },
          ],
        });
      });
    });

    context('with a user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns an empty list if no products are found', async () => {
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});
        res.body.data.should.deep.eq({products: []});
      });

      it('returns active products without userId or a userId', async () => {
        const product1 = await create('products', {});
        const product2 = await create('products', {});
        const productFromUser = await create('products', {userId: user.id});
        await create('products', {active: false});

        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query()});

        res.body.data.products.length.should.eq(3);
        res.body.data.should.deep.eq({
          products: [
            {
              id: productFromUser.id,
              name: productFromUser.name,
              measure: productFromUser.measure,
              calories: productFromUser.calories,
            },
            {
              id: product2.id,
              name: product2.name,
              measure: product2.measure,
              calories: product2.calories,
            },
            {
              id: product1.id,
              name: product1.name,
              measure: product1.measure,
              calories: product1.calories,
            },
          ],
        });
      });
    });
  });

  describe('findProducts', () => {
    const query = (name: string) => {
      return `
        query FindProduct {
          findProducts(name: "${name}") {
            id
            name
            measure
            calories
          }
        }
      `;
    };

    context('without a user', () => {
      it('returns an empty list if no products are found', async () => {
        await create('products', {name: 'blah'});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query('asdf')});
        res.body.data.should.deep.eq({findProducts: []});
      });

      it('returns a list of active products without a user id', async () => {
        const product1 = await create('products', {name: 'short name'});
        const product2 = await create('products', {name: 'long name test'});
        const user = await create('users', {});
        await create('products', {userId: user.id, name: 'user name'});
        await create('products', {active: false, name: 'inactive name'});
        const res = await chai
          .request(app)
          .post('/graphql')
          .send({query: query('name')});
        res.body.data.findProducts.length.should.eq(2);
        res.body.data.should.deep.eq({
          findProducts: [
            {
              id: product2.id,
              name: product2.name,
              measure: product2.measure,
              calories: product2.calories,
            },
            {
              id: product1.id,
              name: product1.name,
              measure: product1.measure,
              calories: product1.calories,
            },
          ],
        });
      });
    });

    context('with a user', () => {
      let cookie: string;
      let user: User;

      beforeEach(async () => {
        user = await create('users', {});
        cookie = await authUser(user);
      });

      it('returns an empty list if no products are found', async () => {
        await create('products', {name: 'blah'});
        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query('asdf')});
        res.body.data.should.deep.eq({findProducts: []});
      });

      it('returns active products without userId or a userId', async () => {
        const product1 = await create('products', {name: 'short name'});
        const product2 = await create('products', {name: 'long name test'});
        const productFromUser = await create('products', {
          userId: user.id,
          name: 'user name',
        });
        await create('products', {active: false, name: 'inactive name'});

        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: query('name')});

        res.body.data.findProducts.length.should.eq(3);
        res.body.data.should.deep.eq({
          findProducts: [
            {
              id: productFromUser.id,
              name: productFromUser.name,
              measure: productFromUser.measure,
              calories: productFromUser.calories,
            },
            {
              id: product2.id,
              name: product2.name,
              measure: product2.measure,
              calories: product2.calories,
            },
            {
              id: product1.id,
              name: product1.name,
              measure: product1.measure,
              calories: product1.calories,
            },
          ],
        });
      });
    });
  });

  describe('addProduct', () => {
    const mutation = (name: string, measure: string, calories: number) => {
      return `
        mutation AddProduct {
          addProduct(
            name: "${name}"
            measure: "${measure}"
            calories: ${calories}
          ) {
            product {
              name
              measure
              calories
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
          .send({query: mutation('name', 'measure', 123)});
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

      it('creates and returns a new product', async () => {
        (await Product.find()).length.should.eq(0);

        const res = await chai
          .request(app)
          .post('/graphql')
          .set('Cookie', cookie)
          .send({query: mutation('name', 'measure', 456)});

        res.body.data.addProduct.product.should.deep.eq({
          name: 'name',
          measure: 'measure',
          calories: 456,
        });

        const p = await Product.find();
        p.length.should.eq(1);
        p[0].userId.should.eq(user.id);
      });
    });
  });
});
