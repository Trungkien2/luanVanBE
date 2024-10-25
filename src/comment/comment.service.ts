import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService extends CrudService<Comment> {
  constructor() {
    super(Comment);
  }
}
