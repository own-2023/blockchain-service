import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule.register(
    {
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }
    }
  )],
  providers: [AuthService, AuthGuard, JwtService],
  exports: [AuthService, AuthGuard, JwtService]

})
export class AuthModule { }
