import {Field, ObjectType} from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import TTimeSeriesRow from '../types/TTimeSeriesRow';
import User from './User';

@Entity()
@ObjectType()
export default class Weight extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user, {nullable: false})
  user!: User;

  @Column()
  userId!: number;

  @Field(() => Number)
  @Column()
  weight!: number;

  @Field(() => String)
  @Column()
  measure!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  static async getTimeSeries(userId: number): Promise<TTimeSeriesRow[]> {
    const weights: Weight[] = await Weight.find({
      select: ['createdAt', 'weight', 'measure'],
      where: {userId: userId},
      order: {
        createdAt: 'ASC',
      },
      take: 50,
    });

    return weights.map((w: Weight) => {
      return [w.createdAt, w.measure === 'kg' ? w.weight : w.weight * 0.45];
    });
  }
}
