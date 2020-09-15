import chai from 'chai';
import chaiHttp from 'chai-http';
import loader from '../src/server';
import fs from 'fs';
import path from 'path';
import {getManager, createConnection, getConnection} from 'typeorm';
import User from '../src/entity/User';

chai.use(chaiHttp);
chai.should();

beforeEach(async () => {
  try {
    getConnection();
  } catch (e) {
    await createConnection();
  }
  const manager = getManager();
  await manager.query('DROP SCHEMA IF EXISTS public CASCADE;');
  await manager.query('CREATE SCHEMA public;');
  const fullPath = path.join(__dirname, 'database.sql');
  const sql = await fs.promises.readFile(fullPath);
  await manager.query(sql.toString());
});

export const authUser = async (user: User): Promise<string> => {
  const app = await loader();
  const query = `
    mutation Login {
      login (email: "${user.email}", password: "${user.password}") {
        user {
          id
          email
        }
        error
      }
    }
  `;

  const res = await chai.request(app).post('/graphql').send({query: query});
  return res.get('Set-Cookie')[0];
};

export {loader};

export default chai;
