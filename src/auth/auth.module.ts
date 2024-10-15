import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stragery/jwt.stragery';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
})
export class AuthModule {}
