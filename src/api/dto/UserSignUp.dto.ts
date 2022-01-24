import { IsString, MinLength, MaxLength, IsEmail } from "class-validator";
import { IsNotBlank } from "../custom-validators/isNotBlank.validator";

export class UserSignUpDto {

  @IsNotBlank()
  @IsString()
  @MinLength(4, { message: "username must be at least 4 characters long." })
  @MaxLength(20, { message: "username must be at most 20 characters long." })
  username: string;


  @IsNotBlank({ message: "Email field can't be empty." })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotBlank({ message: 'Password field can\'t be blank' })
  password: string;



}
