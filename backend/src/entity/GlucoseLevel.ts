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
import User from './User';

@Entity()
@ObjectType()
export default class GlucoseLevel extends BaseEntity {
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
  level!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  static async getTimeSeries(userId: number): Promise<[Date, number][]> {
    const glucoseLevels = await GlucoseLevel.find({
      select: ['createdAt', 'level'],
      where: {userId: userId},
      order: {
        createdAt: 'ASC',
      },
      take: 50,
    });
    return glucoseLevels.map((gl: GlucoseLevel) => [gl.createdAt, gl.level]);
  }
}
