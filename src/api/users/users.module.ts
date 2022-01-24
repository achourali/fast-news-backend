import { Module } from '@nestjs/common';
import { UserRepository } from '../repositories/User.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({


  controllers: [UsersController],
  providers: [UsersService,UserRepository],

})
export class UsersModule {}
