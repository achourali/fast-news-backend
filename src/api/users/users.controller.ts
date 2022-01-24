import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Body,ValidationPipe } from "@nestjs/common";
import { UserSignUpDto } from '../dto/UserSignUp.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('hello')
  getHello() {
    return this.usersService.hello();
  }

  @Post('addUser')
  addUser(@Body(ValidationPipe) userSignUpDto:UserSignUpDto){
    return this.usersService.addUser(userSignUpDto)
    

  }
}
