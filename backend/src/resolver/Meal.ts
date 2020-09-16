import {
  Resolver,
  Query,
  Arg,
  Int,
  InputType,
  Field,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import {getConnection} from 'typeorm';
import Meal from '../entity/Meal';
import MealProduct from '../entity/MealProduct';
import MealType from '../entity/MealType';
import Product from '../entity/Product';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@InputType()
class ProductInput {
  @Field()
  productId: number;

  @Field()
  amount: number;
}

@InputType()
class MealInput {
  @Field()
  mealTypeId: number;

  @Field(() => [ProductInput])
  products: ProductInput[];
}

const relations = ['mealType', 'mealProducts', 'mealProducts.product'];

@Resolver(Meal)
export default class MealResolver {
  // Example:
  // query Meal {
  //   meal(id: 1) {
  //     mealType {
  //       name
  //     }
  //     mealProducts {
  //       amount
  //       product {
  //         name
  //         measure
  //         calories
  //       }
  //     }
  //   }
  // }
  @Query(() => Meal, {nullable: true})
  @UseMiddleware(withUser)
  meal(
    @Arg('id', () => Int) id: number,
    @Ctx() {req}: TContext,
  ): Promise<Meal> {
    return Meal.getFullRecord(id, req.user.id);
  }

  // Example:
  // query Meals {
  //   meals(skip: 1, take: 5) {
  //     mealType {
  //       name
  //     }
  //     mealProducts {
  //       amount
  //       product {
  //         name
  //         measure
  //         calories
  //       }
  //     }
  //   }
  // }
  @Query(() => [Meal], {nullable: true})
  @UseMiddleware(withUser)
  meals(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
    @Ctx() {req}: TContext,
  ): Promise<Meal[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Meal.getFullRecords(req.user.id);
  }

  // Example:
  // mutation AddMeal {
  //   addMeal(
  //     input: {
  //       mealTypeId: 1
  //       products: [
  //         { productId: 1, amount: 3 }
  //         { productId: 2, amount: 2 }
  //         { productId: 3, amount: 1 }
  //       ]
  //     }
  //   ) {
  //     mealType {
  //       name
  //     }
  //     mealProducts {
  //       amount
  //       product {
  //         name
  //         measure
  //         calories
  //       }
  //     }
  //   }
  // }
  @Mutation(() => Meal)
  @UseMiddleware(withUser)
  async addMeal(
    @Arg('input') input: MealInput,
    @Ctx() {req}: TContext,
  ): Promise<Meal> {
    // TODO: Run in transaction

    const mealType = await MealType.findOne({
      where: {active: true, id: input.mealTypeId},
    });
    if (!mealType) throw new Error('Invalid meal type.');

    const meal = new Meal();
    meal.userId = req.user.id;
    meal.mealTypeId = input.mealTypeId;
    await meal.save();

    const promises = input.products.map(async (p: ProductInput) => {
      const product = await getConnection()
        .getRepository(Product)
        .createQueryBuilder('product')
        .where({id: p.productId, active: true, userId: null})
        .orWhere(`id = :productId AND active IS TRUE AND "userId" = :userId`, {
          userId: req.user.id,
          productId: p.productId,
        })
        .getOne();
      if (product) {
        const mealProduct = new MealProduct();
        mealProduct.meal = meal;
        mealProduct.product = product;
        mealProduct.amount = p.amount;
        await mealProduct.save();
      }
    });
    await Promise.all(promises);

    return Meal.findOne(meal.id, {relations});
  }
}
