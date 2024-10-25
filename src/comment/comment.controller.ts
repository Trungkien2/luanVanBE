import { Controller, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class CommentController extends CrudController<CommentService> {
  constructor(private readonly commentService: CommentService) {
    super(commentService);
  }
}
