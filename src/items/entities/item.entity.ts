import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemToInvoices } from './itemToInvoices';

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

  @Column('simple-json')
  @Field(() => GraphQLJSON)
  images: JSON;

  @Column('simple-json')
  @Field(() => GraphQLJSON)
  quantity: JSON;

  @OneToMany(() => ItemToInvoices, (itemToInvoices) => itemToInvoices.item, {
    cascade: true,
    eager: true,
  })
  public itemToInvoices!: ItemToInvoices[];
}
