import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsResolver } from './resolvers/items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './controllers/item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [ItemsService, ItemsResolver],
})
export class ItemsModule {}
