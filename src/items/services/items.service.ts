import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
