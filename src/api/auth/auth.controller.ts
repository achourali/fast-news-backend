import { Controller, Get, Post, Delete, Request, Response, Body, UseGuards,ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from '../dto/UserLogin.dto';
import { User } from '../entities/User.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async clientLogin(@Body(ValidationPipe) userLoginDto:UserLoginDto) : Promise<{ accessToken : string , user : User}|void>{
    return this.authService.login(userLoginDto);
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('login')
  // async login(@Request() req, @Response() res) {
  //   console.log('login')
  //   const loginResult = await this.authService.login(req.user);
  //   this.setAccessTokenCookie(res, loginResult.accessToken);
  //   res.send(loginResult);
  // }


  @Post('refresh-token')
  async refreshToken(@Body() body,  @Response() res): Promise<any> {
    const loginResult = await this.authService.refreshToken(body.token);
    this.setAccessTokenCookie(res, loginResult.accessToken);
    res.send(loginResult);
  }

  @Delete('logout')
  async logout( @Response() res): Promise<any> {
    this.deleteAccessTokenCookie(res);
    res.send(this.authService.logout());
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req):User {
    return req.user;
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
