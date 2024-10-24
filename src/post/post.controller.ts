import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { CreatePostDto } from './dto/create-post.dto';
@ApiTags('Post')
@Controller('post')
export class PostController extends CrudController<PostService> {
  constructor(private readonly postService: PostService) {
    super(postService);
  }

  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: CreatePostDto })
  async create(@Body() body: any) {
    return await this.postService.create(body);
  }
}
