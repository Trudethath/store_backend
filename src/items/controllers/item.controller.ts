import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { ItemsService } from '../services/items.service';
import { MailService } from 'src/mail/mail.service';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly mailService: MailService,
  ) {}
  @Get()
  async findAllItems() {
    const items = await this.itemsService.findAll();
    return items;
  }

  @Post('createinvoice')
  @UsePipes(ValidationPipe)
  async createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    this.itemsService.createInvoice(createInvoiceDto);
    this.mailService.sendMail('test@ds.ds', createInvoiceDto.models);
  }
}
