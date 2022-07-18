import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
@ObjectType()
export class Invoices {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  @Field(() => Int, { nullable: true })
  invoiceId: number;

  @Column()
  @Field(() => String)
  models: string;

  @Column()
  @Field(() => Float)
  shipping: number;

  @Column()
  @Field(() => Float)
  payment: number;

  @Column()
  @Field(() => Float)
  subtotal: number;

  @Column()
  @Field(() => Int)
  vat: number;

  @Column()
  @Field(() => Float)
  total: number;

  @Column()
  @Field(() => String)
  user: string;

  @Column()
  @Field(() => String)
  created_at: string;

  @Column()
  @Field(() => String)
  updated_at: string;

  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];
}
