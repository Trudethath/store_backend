import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'donkey_store',
      entities: entities,
      synchronize: true, // when in production switch to false
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
