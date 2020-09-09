import {Field, ObjectType} from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import User from './User';
import MealProduct from './MealProduct';
import MealType from './MealType';

@Entity()
@ObjectType()
export default class Meal extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user, {nullable: false})
  user!: User;

  @Column()
  userId!: number;

  @Field()
  @ManyToOne(() => MealType, (mealType) => mealType, {nullable: false})
  mealType!: MealType;

  @Column()
  mealTypeId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MealProduct, (mealProduct) => mealProduct.meal)
  mealProducts: MealProduct[];
}
