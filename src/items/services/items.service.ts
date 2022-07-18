import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { CreateItemInput } from '../dto/create-item.input';
import { UpdateItemInput } from '../dto/update-item.input';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
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
    const item = await this.itemRepository.findOneBy({ model });
    const newItem = item;
    newItem.quantity = updateItemInput.quantity;
    const itemToSave = this.itemRepository.create(newItem);
    return this.itemRepository.save(itemToSave);
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
