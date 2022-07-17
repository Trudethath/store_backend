import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, models: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'test email',
      template: './templates/email',
      context: {
        models: models,
      },
    });
  }
}
