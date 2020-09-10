import {Request, Response} from 'express';
import User from '../entity/User';

export type TContext = {
  req: Request & {session: Express.Session} & {user?: User};
  res: Response;
};
