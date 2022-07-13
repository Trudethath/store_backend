import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Variations } from './variations.entity';

@Entity()
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @Field(() => Int, { nullable: true })
  itemId: number;

  @Column()
  @Field(() => String)
  model: string;

  @Column()
  @Field(() => String)
  gender: string;

  @Column()
  @Field(() => Int)
  release_year: number;

  @Column()
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Int)
  onSale: number;

  @Column({ type: 'json' })
  @Field(() => GraphQLJSON, { nullable: true })
  variations?: JSON;
}
