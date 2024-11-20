import { Module } from '@nestjs/common';
import { MessageReadsService } from './message_reads.service';
import { MessageReadsController } from './message_reads.controller';

@Module({
  controllers: [MessageReadsController],
  providers: [MessageReadsService]
})
export class MessageReadsModule {}
