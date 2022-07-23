import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ItemsModule } from './items/items.module';
import { Item } from './items/entities/item.entity';
import GraphQLJSON from 'graphql-type-json';
import { Invoices } from './items/entities/invoices.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { ItemToInvoices } from './items/entities/itemToInvoices';

console.log(process.cwd() + 'src/mail/templates');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'donkey_store',
      entities: [User, Item, Invoices, ItemToInvoices],
      synchronize: true, // when in production switch to false
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      resolvers: { JSON: GraphQLJSON },
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.mailtrap.io',
          secure: false,
          auth: {
            user: 'a3ae38714d2913',
            pass: 'b3515a92bd5397',
          },
        },
        defaults: {
          from: '<sendgrid_from_email_address>',
        },
        template: {
          dir: process.cwd() + '/src/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    ItemsModule,
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class AppModule {}
