import { Injectable ,HttpException,HttpStatus,ConflictException} from '@nestjs/common';
import { User } from '../entities/User.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '../repositories/User.repository';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
  }
  hello(){
    return 'hello users'
  }

  async addUser(UserSignUp) {
    
    await this.userRepository.signup(UserSignUp)
    return 'done'
  }
}