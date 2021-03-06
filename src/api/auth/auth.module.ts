import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [        
    PassportModule.register({        
      defaultStrategy: 'jwt',       
    }),                   
    JwtModule.register({          
      secret: jwtConstants.secret,             
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),                   
  ],          
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [PassportModule, AuthService],
})        
export class AuthModule {}
