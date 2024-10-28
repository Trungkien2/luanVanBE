import { Module } from '@nestjs/common';
import { PostReportService } from './post_report.service';
import { PostReportController } from './post_report.controller';

@Module({
  controllers: [PostReportController],
  providers: [PostReportService],
})
export class PostReportModule {}
