import {Field, ObjectType} from 'type-graphql';
import Product from './Product';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export default class Meal extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({nullable: true}) // TODO: Not nullable
  userId: string;

  @Field()
  @Column({nullable: true})
  mealType: string;

  @Field(() => [Product], {nullable: true})
  @ManyToMany(() => Product, (product: Product) => product.meals)
  products: Product[];
}
