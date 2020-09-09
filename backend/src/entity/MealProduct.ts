import {Field, ObjectType} from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import Product from './Product';
import Meal from './Meal';

@Entity()
@ObjectType()
export default class MealProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @ManyToOne(() => Meal, (meal) => meal.mealProducts, {
    primary: true,
    nullable: false,
  })
  meal!: Meal;

  @ManyToOne(() => Product, (product) => product.mealProducts, {
    primary: true,
    nullable: false,
  })
  product!: Product;

  @Column()
  @Field()
  amount!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
