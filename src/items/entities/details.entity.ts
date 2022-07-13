import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Details {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @Field(() => Int)
  size: number;

  @Column()
  @Field(() => Int)
  black_quantity: number;

  @Column()
  @Field(() => Int)
  grey_quantity: number;

  @Column()
  @Field(() => Int)
  yellow_quantity: number;

  @Column()
  @Field(() => Int)
  green_quantity: number;

  @Column()
  @Field(() => Int)
  red_quantity: number;
}
