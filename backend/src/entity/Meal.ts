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
  getConnection,
} from 'typeorm';
import User from './User';
import MealProduct from './MealProduct';
import MealType from './MealType';
import TTimeSeriesRow from '../types/TTimeSeriesRow';

@Entity()
@ObjectType()
export default class Meal extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field(() => User)
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

  @Field(() => [MealProduct])
  @OneToMany(() => MealProduct, (mealProduct) => mealProduct.meal)
  mealProducts: MealProduct[];

  static async getFullRecord(id: number, userId: number): Promise<Meal> {
    return getConnection()
      .getRepository(Meal)
      .createQueryBuilder('meal')
      .innerJoinAndSelect('meal.mealProducts', 'mealProducts')
      .innerJoinAndSelect('mealProducts.product', 'products')
      .innerJoinAndSelect('meal.mealType', 'mealType')
      .where({id, userId})
      .andWhere('mealType.active IS TRUE')
      .andWhere('products.active IS TRUE')
      .getOne();
  }

  static async getFullRecords(
    userId: number,
    take = 10,
    skip = 0,
  ): Promise<Meal[]> {
    return getConnection()
      .getRepository(Meal)
      .createQueryBuilder('meal')
      .innerJoinAndSelect('meal.mealProducts', 'mealProducts')
      .innerJoinAndSelect('mealProducts.product', 'products')
      .innerJoinAndSelect('meal.mealType', 'mealType')
      .where({userId})
      .andWhere('products.active IS TRUE')
      .andWhere('mealType.active IS TRUE')
      .skip(skip)
      .take(take)
      .orderBy('meal.id', 'DESC')
      .getMany();
  }

  static async getTimeSeries(userId: number): Promise<TTimeSeriesRow[]> {
    const dbMeals = await getConnection()
      .getRepository(Meal)
      .createQueryBuilder('meal')
      .innerJoinAndSelect('meal.mealProducts', 'mealProducts')
      .innerJoinAndSelect('mealProducts.product', 'products')
      .innerJoinAndSelect('meal.mealType', 'mealType')
      .where({userId})
      .andWhere('products.active IS TRUE')
      .andWhere('mealType.active IS TRUE')
      .take(50)
      .orderBy('meal.createdAt', 'DESC')
      .getMany();

    return dbMeals.map((m: Meal) => {
      const calories = m.mealProducts.reduce((acc, mealProduct) => {
        return acc + mealProduct.product.calories;
      }, 0);
      return [m.createdAt, calories];
    });
  }
}
