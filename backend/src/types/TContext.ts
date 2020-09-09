import {Request, Response} from 'express';

export type TContext = {
  req: Request & {session: Express.Session};
  res: Response;
};
