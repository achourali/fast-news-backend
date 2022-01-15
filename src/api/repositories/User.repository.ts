import { User } from '../entities/User.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserSignUpDto } from '../dto/UserSignUp.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(userSignUpDto: UserSignUpDto) {
    const { username, email, password } = userSignUpDto;

    const existingUser =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ username: username }));

    if (existingUser != undefined)
      throw new ConflictException('email or username already in use !');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
 
    let user = new User(username, email, hashedPassword);

    user.save();
  }
}
