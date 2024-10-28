import { PartialType } from '@nestjs/swagger';
import { CreateBlockedUserDto } from './create-blocked_user.dto';

export class UpdateBlockedUserDto extends PartialType(CreateBlockedUserDto) {}
