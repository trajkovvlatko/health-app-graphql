import {MiddlewareFn} from 'type-graphql';
import {TContext} from '../types/TContext';
import User from '../entity/User';

const withPotentialUser: MiddlewareFn<TContext> = async ({context}, next) => {
  const userId = context.req.session.userId;
  if (!userId) return next();

  const user = await User.findOne(userId, {where: {active: true}});
  if (!user) return next();

  context.req.user = user;

  return next();
};

export default withPotentialUser;
