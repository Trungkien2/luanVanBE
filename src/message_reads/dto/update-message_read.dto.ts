import { PartialType } from '@nestjs/swagger';
import { CreateMessageReadDto } from './create-message_read.dto';

export class UpdateMessageReadDto extends PartialType(CreateMessageReadDto) {}
