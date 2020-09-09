import {Resolver, Query, Arg, Int} from 'type-graphql';
import {Like, Raw} from 'typeorm';
import Product from '../entity/Product';

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
}
