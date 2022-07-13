import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateItemInput {
  @Field(() => Int, { nullable: true })
  @IsNotEmpty()
  itemId: number;

  @Field()
  @IsNotEmpty()
  model: string;

  @Field(() => String)
  @IsNotEmpty()
  gender: string;

  @Field(() => Int)
  @IsNotEmpty()
  release_year: number;

  @Field(() => Float)
  @IsNotEmpty()
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsNotEmpty()
  onSale: number;

  @Field(() => GraphQLJSON, { nullable: true })
  variations?: JSON;
}
