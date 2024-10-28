import { Module } from '@nestjs/common';
import { BlockedUserService } from './blocked_user.service';
import { BlockedUserController } from './blocked_user.controller';

@Module({
  controllers: [BlockedUserController],
  providers: [BlockedUserService]
})
export class BlockedUserModule {}
