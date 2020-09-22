import {MiddlewareFn} from 'type-graphql';
import {TContext} from '../types/TContext';
import User from '../entity/User';

const withUser: MiddlewareFn<TContext> = async ({context}, next) => {
  const userId = context.req.session.userId;
  if (!userId) throw new Error('Not authenticated.');

  const user = await User.findOne(userId, {where: {active: true}});
  if (!user) throw new Error('Not authenticated.');

  context.req.user = user;

  return next();
};

export default withUser;
