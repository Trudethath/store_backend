import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => GraphQLJSON)
  quantity: JSON;
}
