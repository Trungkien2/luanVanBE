import { PartialType } from '@nestjs/swagger';
import { CreateConversationMemberDto } from './create-conversation_member.dto';

export class UpdateConversationMemberDto extends PartialType(CreateConversationMemberDto) {}
