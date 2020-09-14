import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import fs from 'fs';
import path from 'path';
import {getManager, createConnection, getConnection} from 'typeorm';

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

export const loader = app;

export default chai;
