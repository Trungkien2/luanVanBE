import { Module } from '@nestjs/common';
import { MessageReadsService } from './message_reads.service';
import { MessageReadController } from './message_reads.controller';

@Module({
  controllers: [MessageReadController],
  providers: [MessageReadsService],
})
export class MessageReadsModule {}
