import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { UserController } from './user.controller';
import { followProviders } from 'src/follow/follow.provider';

@Module({
  providers: [UserService, ...usersProviders, ...followProviders],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
