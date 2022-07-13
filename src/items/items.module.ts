import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsResolver } from './resolvers/items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
