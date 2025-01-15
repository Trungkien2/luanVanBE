import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostHashtagService } from './post_hashtag.service';
import { CreatePostHashtagDto } from './dto/create-post_hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post_hashtag.dto';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('post-hashtag')
export class PostHashtagController extends CrudController<PostHashtagService> {
  constructor(private readonly postHashtagService: PostHashtagService) {
    super(postHashtagService);
  }

}
