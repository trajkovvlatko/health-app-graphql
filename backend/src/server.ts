import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import {createConnection} from 'typeorm';
import MealResolver from './resolver/Meal';
import ProductResolver from './resolver/Product';
import MealTypeResolver from './resolver/MealType';
import UserResolver from './resolver/User';
import session from 'express-session';
import Session from './entity/Session';
import {TypeormStore} from 'connect-typeorm/out';

dotenv.config();

export default async function (): Promise<void> {
  const connection = await createConnection();
  const sessionRepository = connection.getRepository(Session);

  const app = express();
  app.use(
    cors({
      origin: process.env.CLIENT,
      credentials: true,
    }),
  );

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400,
      }).connect(sessionRepository),
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        MealResolver,
        ProductResolver,
        MealTypeResolver,
        UserResolver,
      ],
      validate: false,
    }),
    context: ({req, res}) => ({req, res}),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  });

  apolloServer.applyMiddleware({app, cors: false});

  app.listen(process.env.PORT, () => {
    console.log(`Started server on http://localhost:${process.env.PORT}`);
  });
}
