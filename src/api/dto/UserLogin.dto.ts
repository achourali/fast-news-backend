import { IsString } from "class-validator";
import { IsNotBlank } from "../custom-validators/isNotBlank.validator";

export class UserLoginDto{

  @IsString()
  @IsNotBlank({message : 'username field can\'t be blank'})
  username : string;

  @IsString()
  @IsNotBlank({message : 'Password field can\'t be blank'})
  password : string;

}