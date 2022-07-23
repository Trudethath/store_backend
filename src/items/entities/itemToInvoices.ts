import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoices } from './invoices.entity';
import { Item } from './item.entity';

@Entity()
export class ItemToInvoices {
  @PrimaryGeneratedColumn()
  public ItemToInvoicesId!: number;

  @Column()
  public itemId!: number;

  @Column()
  public InvoicesId!: number;

  @Column()
  public unitPrice!: number;

  @Column()
  public quantity!: number;

  @ManyToOne(() => Item, (item) => item.itemToInvoices)
  public item!: Item;

  @ManyToOne(() => Invoices, (invoices) => invoices.itemToInvoices)
  public invoices!: Invoices;
}
