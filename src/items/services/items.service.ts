import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { CreateItemInput } from '../dto/create-item.input';
import { UpdateItemInput } from '../dto/update-item.input';
import { Invoices } from '../entities/invoices.entity';
import { Item } from '../entities/item.entity';
import { ItemToInvoices } from '../entities/itemToInvoices';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemToInvoices)
    private readonly itemToInvoices: Repository<ItemToInvoices>,
    private dataSource: DataSource,
  ) {}

  create(createItemInput: CreateItemInput) {
    const newItem = this.itemRepository.create(createItemInput);
    return this.itemRepository.save(newItem);
  }

  findAll() {
    const items = this.itemRepository.find();
    return items;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  findOneByModel(model: string) {
    const item = this.itemRepository.findOneBy({ model });
    return item;
  }

  // async updateByModel(model: string, updateItemInput: UpdateItemInput) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   console.log(model);

  //   await queryRunner.connect();
  //   // const newItem = await this.itemRepository.findOneBy({ model });
  //   const newItem = await queryRunner.query(
  //     `SELECT * from item where model='${model}'`,
  //   );
  //   newItem.quantity = updateItemInput.quantity;
  //   await queryRunner.startTransaction();
  //   // try {
  //   // await queryRunner.query(
  //   //   `UPDATE item set quantity='${JSON.stringify(
  //   //     updateItemInput.quantity,
  //   //   )}' where model='${model}'`,
  //   // );
  //   //   await queryRunner.manager.save(newItem);
  //   // } catch (err) {
  //   //   console.log('err');
  //   //   console.log(err);
  //   //   await queryRunner.rollbackTransaction();
  //   // } finally {
  //   //   await queryRunner.release();
  //   // }

  //   const itemToSave = this.itemRepository.create(newItem);
  //   return this.itemRepository.save(itemToSave);
  // }

  // WITHOUT TRANSACTION
  async updateByModel(model: string, updateItemInput: UpdateItemInput) {
    const newItem = await this.itemRepository.findOneBy({ model });
    newItem.quantity = updateItemInput.quantity;
    // const itemToSave = this.itemRepository.create(newItem);
    console.log(newItem);
    return this.itemRepository.save(newItem);
  }

  createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const date = new Date().toLocaleDateString();

    const invoice = new Invoices();

    invoice.models = createInvoiceDto.models;
    invoice.shipping = createInvoiceDto.shipping;
    invoice.payment = createInvoiceDto.payment;
    invoice.subtotal = createInvoiceDto.subtotal;
    invoice.vat = createInvoiceDto.vat;
    invoice.total = createInvoiceDto.total;
    invoice.user = createInvoiceDto.user;
    invoice.created_at = date;
    invoice.updated_at = date;

    return this.dataSource.manager.save(invoice);
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
