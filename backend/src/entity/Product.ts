import {Field, ObjectType} from 'type-graphql';
import {
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import Meal from './Meal';

@Entity()
@ObjectType()
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Field(() => [Meal], {nullable: true})
  @ManyToMany(() => Meal, (meal: Meal) => meal.products, {cascade: true})
  @JoinTable()
  meals: Meal[];
}
