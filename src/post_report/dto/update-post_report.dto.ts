import { PartialType } from '@nestjs/swagger';
import { CreatePostReportDto } from './create-post_report.dto';

export class UpdatePostReportDto extends PartialType(CreatePostReportDto) {}
