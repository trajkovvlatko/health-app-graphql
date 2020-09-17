import {Field, ObjectType} from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Exercise from './Exercise';

@Entity()
@ObjectType()
export default class ExerciseType extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  calories!: number;

  @Column({default: true})
  @Field()
  active!: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.exerciseType)
  exercises: Exercise[];
}
