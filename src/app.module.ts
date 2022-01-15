import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './api/repositories/User.repository';
import { User } from './api/entities/User.entity';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { NewsModule } from './api/news/news.module';
  
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fastnews',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
    UsersModule,
    AuthModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
