import {
  Resolver,
  Query,
  Arg,
  ObjectType,
  Field,
  Mutation,
  Ctx,
  UseMiddleware,
} from 'type-graphql';
import User from '../entity/User';
import bcrypt from 'bcrypt';
import {TContext} from '../types/TContext';
import withUser from '../middlewares/withUser';

@ObjectType()
class UserResponse {
  @Field(() => String, {nullable: true})
  error?: string;

  @Field(() => User, {nullable: true})
  user?: User;
}

@Resolver(User)
export default class UserResolver {
  // Example:
  // query Profile {
  //   profile {
  //     id
  //     email
  //   }
  // }
  @UseMiddleware(withUser)
  @Query(() => User, {nullable: true})
  profile(@Ctx() {req}: TContext): Promise<User> {
    if (!req.session.userId) return null;
    return User.findOne(req.session.userId, {
      where: {active: true},
    });
  }

  // Example:
  // mutation Login {
  //   login (email: "email@email.com", password: "password") {
  //     user {
  //       id
  //       email
  //     }
  //     error
  //   }
  // }
  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {req}: TContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({where: {email}});
    if (!user) return {error: 'Email not found.'};
    if (!user.active) return {error: 'Inactive user.'};

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return {error: 'Invalid password.'};

    req.session.userId = user.id;
    return {user};
  }

  // Example:
  // mutation Register {
  //   register (email: "email@email.com", password: "password") {
  //     user {
  //       id
  //       email
  //     }
  //     error
  //   }
  // }
  @Mutation(() => UserResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {req}: TContext,
  ): Promise<UserResponse> {
    email = email.trim();
    password = password.trim();
    if (email === '') return {error: 'Invalid email.'};
    if (password === '') return {error: 'Invalid password.'};

    const hash = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({email, password: hash}).save();
      req.session.userId = user.id;
      return {user};
    } catch (err) {
      return {error: 'Cannot create user.'};
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() {req, res}: TContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.COOKIE_NAME);
        return err ? resolve(false) : resolve(true);
      }),
    );
  }
}
