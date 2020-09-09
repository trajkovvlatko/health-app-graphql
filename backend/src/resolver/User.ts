import {Resolver, Query, Arg, Int} from 'type-graphql';
import User from '../entity/User';

@Resolver(User)
export default class UserResolver {
  @Query(() => User, {nullable: true})
  profile(@Arg('id', () => Int) id: number): Promise<User> {
    return User.findOne(id, {
      relations: ['meals'],
    });
  }
}
