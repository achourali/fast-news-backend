import {
  Controller,
  Get,
  Post,
  Delete,
  Request,
  Response,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from '../dto/UserLogin.dto';
import { User } from '../entities/User.entity';         
import { AuthService } from './auth.service';         
       
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async clientLogin(
    @Body(ValidationPipe) userLoginDto: UserLoginDto,
  ): Promise<{ accessToken: string; user: User } | void> {
    return this.authService.login(userLoginDto);
  }     
             

           
  @Post('refresh-token')
  async refreshToken(@Body() body, @Response() res): Promise<any> {
    const loginResult = await this.authService.refreshToken(body.token);
    this.setAccessTokenCookie(res, loginResult.accessToken);
    res.send(loginResult);
  }      
            
  @Delete('logout')
  async logout(@Response() res): Promise<any> {
    this.deleteAccessTokenCookie(res);
    res.send(this.authService.logout());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')

  async getProfile(@Request() req) {
    const user = await this.authService.getUserByemail(req.user.email);
    return user;
  }

  private readonly JWT_COOKIE_AGE = 365 * 24 * 60 * 60 * 1000;

  private setAccessTokenCookie(res, accessToken: string) {
    res.cookie('accessToken', accessToken, {
      maxAge: this.JWT_COOKIE_AGE,
    });
  }
      
  private deleteAccessTokenCookie(res) {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });
  }
}
