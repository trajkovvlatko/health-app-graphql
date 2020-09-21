import {Field, ObjectType} from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  getConnection,
} from 'typeorm';
import ExerciseType from './ExerciseType';
import User from './User';

@Entity()
@ObjectType()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user, {nullable: false})
  user!: User;

  @Column()
  userId!: number;

  @Field(() => ExerciseType)
  @ManyToOne(() => ExerciseType, (exerciseType) => exerciseType, {
    nullable: false,
  })
  exerciseType!: ExerciseType;

  @Column()
  exerciseTypeId!: number;

  @Field(() => Number)
  @Column()
  duration!: number;

  @Field(() => Number)
  @Column()
  intensity!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  static async getFullRecord(id: number, userId: number): Promise<Exercise> {
    return getConnection()
      .getRepository(Exercise)
      .createQueryBuilder('exercise')
      .innerJoinAndSelect('exercise.exerciseType', 'exerciseType')
      .where({id, userId})
      .andWhere('exerciseType.active IS TRUE')
      .getOne();
  }

  static async getFullRecords(
    userId: number,
    take = 10,
    skip = 0,
  ): Promise<Exercise[]> {
    return getConnection()
      .getRepository(Exercise)
      .createQueryBuilder('exercise')
      .innerJoinAndSelect('exercise.exerciseType', 'exerciseType')
      .where({userId})
      .andWhere('exerciseType.active IS TRUE')
      .skip(skip)
      .take(take)
      .orderBy('exercise.id', 'DESC')
      .getMany();
  }
}
