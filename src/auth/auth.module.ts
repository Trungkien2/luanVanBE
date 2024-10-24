import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './stragery/jwt.stragery';
import { GoogleStrategy } from './stragery/google.strategy';
import { usersProviders } from 'src/user/user.providers';
import { EmailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, ...usersProviders],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
      global: true,
    }),
    EmailModule,
  ],
})
export class AuthModule {}
