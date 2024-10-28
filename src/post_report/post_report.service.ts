import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { PostReport } from './entities/post_report.entity';

@Injectable()
export class PostReportService extends CrudService<PostReport> {
  constructor() {
    super(PostReport);
  }
}
