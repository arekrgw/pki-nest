import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { UsersHttpModule } from './users/users-http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'pki-nest',
      models: [User],
    }),
    UsersHttpModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
