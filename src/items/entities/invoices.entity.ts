import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { ItemToInvoices } from './itemToInvoices';

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

  @OneToMany(
    () => ItemToInvoices,
    (itemToInvoices) => itemToInvoices.invoices,
    { cascade: true, eager: true },
  )
  public itemToInvoices!: ItemToInvoices[];
}
