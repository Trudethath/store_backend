import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Details } from './details.entity';

@Entity()
@ObjectType()
export class Variations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @Field(() => Int)
  size: number;

  @Column()
  @Field(() => [Details])
  details: Details[];
}
