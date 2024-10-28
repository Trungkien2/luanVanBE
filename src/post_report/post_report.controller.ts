import { Controller, UseGuards } from '@nestjs/common';
import { PostReportService } from './post_report.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

@Controller('post-report')
@ApiTags('Post-report')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PostReportController extends CrudController<PostReportService> {
  constructor(private readonly postReportService: PostReportService) {
    super(postReportService);
  }
}
