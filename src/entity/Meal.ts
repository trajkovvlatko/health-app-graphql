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

  // TODO: This is a bit meh, try to improve.
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

    const pad = (n: number) => (n < 10 ? '0' + n : n);

    const getFullDate = (c: Date): string => {
      const year = pad(c.getFullYear());
      const month = pad(c.getMonth() + 1);
      const day = pad(c.getDate());
      return `${year}-${month}-${day}`;
    };

    const groups = dbMeals.reduce((groups, item: Meal) => {
      const date = getFullDate(item.createdAt);
      const group = groups[date] || [];
      group.push(item);
      groups[date] = group;
      return groups;
    }, {});

    const list = Object.entries(groups).map(
      ([key, meals]: [string, Meal[]]) => {
        const calories = meals.reduce((acc, meal) => {
          return (
            acc +
            meal.mealProducts.reduce((acc1, mealProduct) => {
              return acc1 + mealProduct.product.calories;
            }, 0)
          );
        }, 0);
        return [new Date(key), calories];
      },
    );
    return list as TTimeSeriesRow[];
  }
}
