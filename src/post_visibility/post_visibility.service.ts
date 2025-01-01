import { Inject, Injectable } from '@nestjs/common';
import { PostVisibility } from './entities/post_visibility.entity';
import { CrudService } from 'src/core/Base/crud.service';

@Injectable()
export class PostVisibilityService extends CrudService<PostVisibility> {
  constructor() {
    super(PostVisibility);
  }
}
