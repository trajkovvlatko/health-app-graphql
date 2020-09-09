import {
  Resolver,
  Query,
  Arg,
  Int,
  ObjectType,
  Field,
  Mutation,
  Ctx,
} from 'type-graphql';
import User from '../entity/User';
import bcrypt from 'bcrypt';
import {TContext} from '../types/TContext';

@ObjectType()
class UserResponse {
  @Field(() => String, {nullable: true})
  error?: string;

  @Field(() => User, {nullable: true})
  user?: User;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => User, {nullable: true})
  profile(@Arg('id', () => Int) id: number): Promise<User> {
    return User.findOne(id, {
      relations: ['meals'],
    });
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {req}: TContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({where: {email}});
    if (!user) return {error: 'Email not found.'};

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return {error: 'Invalid password.'};

    req.session.userId = user.id;

    return {user};
  }
}
