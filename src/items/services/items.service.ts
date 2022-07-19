import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { CreateItemInput } from '../dto/create-item.input';
import { UpdateItemInput } from '../dto/update-item.input';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
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

  async updateByModel(model: string, updateItemInput: UpdateItemInput) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const item = await this.itemRepository.findOneBy({ model });
      const newItem = item;
      newItem.quantity = updateItemInput.quantity;
      await queryRunner.manager.save(newItem);
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    // const itemToSave = this.itemRepository.create(newItem);
    // return this.itemRepository.save(itemToSave);
  }

  createInvoice(createInvoiceDto: CreateInvoiceDto) {
    const date = new Date().toLocaleDateString();
    const invoice = createInvoiceDto;
    invoice.created_at = date;
    invoice.updated_at = date;
    return 'this.itemRepository.create(invoice)';
  }

  // update(id: number, updateItemInput: UpdateItemInput) {
  //   return `This action updates a #${id} item`;
  // }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
