import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities, { User } from './typeorm';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ItemsModule } from './items/items.module';
import { Item } from './items/entities/item.entity';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'donkey_store',
      entities: [User, Item],
      synchronize: true, // when in production switch to false
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      resolvers: { JSON: GraphQLJSON },
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
