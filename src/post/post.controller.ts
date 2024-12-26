import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import {
  ApiQueryInfo,
  QueryInfo,
} from 'src/core/decorator/query-info.decorator';
import { QueryInfoDto } from 'src/core/interface/query-info.dto';
import { FavoriteService } from 'src/favorite/favorite.service';
@ApiTags('Post')
@Controller('post')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PostController extends CrudController<PostService> {
  constructor(
    private readonly postService: PostService,
    private readonly likesService: FavoriteService,
  ) {
    super(postService);
  }

  @Post()
  @ApiBody({ type: CreatePostDto })
  async create(@Body() body: any) {
    return await this.postService.create(body);
  }

  @Get('/by-follow')
  @ApiQueryInfo()
  async getPostByFollow(@QueryInfo() queryInfo: QueryInfoDto, @Req() req: any) {
    const userId = req.user.userId; // Lấy userId từ req.user
    queryInfo.where = { ...queryInfo.where, user_id: userId };
    return this.postService.getPostByFollow(queryInfo);
  }

  @Get('/explore')
  @ApiQueryInfo()
  async getPostExplore(@QueryInfo() queryInfo: QueryInfoDto, @Req() req: any) {
    return this.postService.getPostExplore(queryInfo);
  }

  @Get('reels')
  async getReelPosts(@Query() queryInfo: QueryInfoDto, @Req() req: any) {
    const userId = req.user.userId;
    queryInfo.where = { ...queryInfo.where, user_id: userId };
    return this.postService.getReelPosts(queryInfo);
  }

  @Delete(':postId/like') // Endpoint: DELETE /posts/:postId/like
  async deleteLike(@Param('postId') postId: string, @Req() req: any) {
    const userId = req.user.userId; // Lấy user ID từ token
    return this.likesService.removeLike(postId, userId);
  }
}
