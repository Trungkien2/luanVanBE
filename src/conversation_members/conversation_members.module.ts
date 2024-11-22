import { Module } from '@nestjs/common';
import { ConversationMembersService } from './conversation_members.service';
import { ConversationMembersController } from './conversation_members.controller';

@Module({
  controllers: [ConversationMembersController],
  providers: [ConversationMembersService]
})
export class ConversationMembersModule {}
