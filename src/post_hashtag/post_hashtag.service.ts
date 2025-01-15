import { Injectable } from '@nestjs/common';
import { CreatePostHashtagDto } from './dto/create-post_hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post_hashtag.dto';
import { CrudService } from 'src/core/Base/crud.service';
import { PostHashtag } from './entities/post_hashtag.entity';

@Injectable()
export class PostHashtagService extends CrudService<PostHashtag> {
  constructor() {
    super(PostHashtag);
  }
}
