import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from 'src/items/dto/create-invoice.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(
    email: string,
    createInvoiceDto: CreateInvoiceDto,
    date: string,
  ) {
    let modelsString = '<p>';

    for (let index = 0; index < createInvoiceDto.models.length; index++) {
      const element = createInvoiceDto.models[index];
      modelsString += `Model: <b>${element['item'].model}</b> <br/> color: ${element['chosenParameters'].color} <br/> size: ${element['chosenParameters'].size} <br/> Qt: ${element['chosenParameters'].quantity}<hr>`;
    }

    modelsString += '</p><br/>';

    const priceString = `<h3>shipping: ${createInvoiceDto.shipping} | payment: ${createInvoiceDto.payment} | subtotal: ${createInvoiceDto.subtotal} | vat: ${createInvoiceDto.vat}%</h3><br><h2>TOTAL: $${createInvoiceDto.total}</h2>`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'test email',
      template: './templates/email',
      context: {
        email: email,
        models: modelsString,
        date: date,
        priceString: priceString,
      },
    });
  }
}
