import { Injectable, UnauthorizedException ,ConflictException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from '../entities/User.entity';
import { UserLoginDto } from '../dto/UserLogin.dto';
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async login(userLoginDto: UserLoginDto) {
    let actualUser=await this.validUser(userLoginDto)
    if (actualUser)
      return { accessToken : (await this.generateToken(actualUser)).accessToken , user:actualUser}
    else throw new ConflictException("wrong credentials!");
  }

  async validUser(userLoginDto: UserLoginDto):Promise<User|undefined> {
    let { username, password } = userLoginDto;

    let actualUser = await User.findOne({ username: username })
    if (actualUser && await bcrypt.compare(password, actualUser.password)) return actualUser
    else return undefined
  }



  async generateToken(user: User) {
    
    return {
      accessToken: this.jwtService.sign({username:user.username,password:user.password}),
    };
  }

  async refreshToken(token: string) {
    const user = this.jwtService.verify(token, {
      ignoreExpiration: true,
    });
    if (Date.now() > (user.exp + jwtConstants.expiresIn) * 1000) {
      throw new UnauthorizedException('Token expired');
    }
    delete user.iat;
    delete user.exp;
    return this.generateToken(user);
  }

  async logout() {
    // Remove token
  }

}
