import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { followProviders } from './follow.provider';

@Module({
  controllers: [FollowController],
  providers: [FollowService,...followProviders],
})
export class FollowModule {}
