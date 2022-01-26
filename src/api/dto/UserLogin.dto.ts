import { IsEmail, IsString } from 'class-validator';
import { IsNotBlank } from '../custom-validators/isNotBlank.validator';

export class UserLoginDto {
  @IsNotBlank({ message: "Email field can't be empty." })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotBlank({ message: "Password field can't be blank" })
  password: string;
}
