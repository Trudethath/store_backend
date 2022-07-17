import { Controller, Get, Inject } from '@nestjs/common';
import { ItemsService } from '../services/items.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAllItems() {
    const items = await this.itemsService.findAll();
    return items;
  }
}
