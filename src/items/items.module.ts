import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsResolver } from './resolvers/items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './controllers/item.controller';
import { MailService } from 'src/mail/mail.service';
import { ItemToInvoices } from './entities/itemToInvoices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    TypeOrmModule.forFeature([ItemToInvoices]),
  ],
  controllers: [ItemController],
  providers: [ItemsService, ItemsResolver, MailService],
})
export class ItemsModule {}
