import {
  Resolver,
  Query,
  Arg,
  Int,
  Mutation,
  UseMiddleware,
  Ctx,
  Field,
  ObjectType,
} from 'type-graphql';
import {Like} from 'typeorm';
import Product from '../entity/Product';
import withUser from '../middlewares/withUser';
import {TContext} from '../types/TContext';

@ObjectType()
class ProductResponse {
  @Field(() => String, {nullable: true})
  error?: string;

  @Field(() => Product, {nullable: true})
  product?: Product;
}

@Resolver(Product)
export default class ProductResolver {
  // Example:
  // query Products {
  //   products{
  //     name
  //     measure
  //     calories
  //   }
  // }
  @Query(() => [Product], {nullable: true})
  products(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
  ): Promise<Product[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Product.find({
      where: {active: true},
      take,
      skip,
      order: {
        id: 'DESC',
      },
    });
  }

  // Example
  // query FindProducts {
  //   findProducts  (skip: 1, take: 5, name: "product") {
  //     name
  //     measure
  //     calories
  //   }
  // }
  @Query(() => [Product], {nullable: true})
  findProducts(
    @Arg('name', () => String) name: string,
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
  ): Promise<Product[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Product.find({
      where: {name: Like(`%${name}%`), active: true},
      take,
      skip,
    });
  }

  // Example:
  // mutation AddProduct {
  //   addProduct(name: "new product", measure: "g", calories: 100) {
  //     product {
  //       id
  //       name
  //       measure
  //       calories
  //     }
  //     error
  //   }
  // }
  @Mutation(() => ProductResponse)
  @UseMiddleware(withUser)
  async addProduct(
    @Arg('name') name: string,
    @Arg('measure') measure: string,
    @Arg('calories') calories: number,
    @Ctx() {req}: TContext,
  ): Promise<ProductResponse> {
    const product = new Product();
    product.userId = req.user.id;
    product.name = name;
    product.measure = measure;
    product.calories = calories;
    try {
      await product.save();
    } catch (e) {
      return {error: 'Cannot save product.'};
    }
    return {product};
  }
}
