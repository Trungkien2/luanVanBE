import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
@ApiTags('Post')
@Controller('post')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PostController extends CrudController<PostService> {
  constructor(private readonly postService: PostService) {
    super(postService);
  }

  @Post()
  @ApiBody({ type: CreatePostDto })
  async create(@Body() body: any) {
    return await this.postService.create(body);
  }
}
