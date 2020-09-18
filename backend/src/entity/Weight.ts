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
}
