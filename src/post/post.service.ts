import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService extends CrudService<Post> {
  constructor() {
    super(Post);
  }
}
