import {Resolver, Query, Arg, Int} from 'type-graphql';
import Product from '../entity/Product';

@Resolver(Product)
export default class ProductResolver {
  @Query(() => Product, {nullable: true})
  product(@Arg('id', () => Int) id: number): Promise<Product> {
    return Product.findOne(id, {
      relations: ['meals'],
    });
  }

  @Query(() => [Product], {nullable: true})
  products(
    @Arg('take', () => Int, {nullable: true}) take: number | null,
    @Arg('skip', () => Int, {nullable: true}) skip: number | null,
  ): Promise<Product[]> {
    if (!take || take > 10 || take < 1) take = 10;
    if (!skip || skip < 0) skip = 0;

    return Product.find({
      relations: ['meals'],
      take,
      skip,
      order: {
        id: 'DESC',
      },
    });
  }
}
