import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsResolver } from './resolvers/items.resolver';

@Module({
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
