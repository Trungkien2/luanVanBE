import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
@ApiTags('Follow')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class FollowController extends CrudController<FollowService> {
  constructor(private readonly followService: FollowService) {
    super(followService);
  }

  @Post()
  @ApiBody({ type: CreateFollowDto })
  create(@Body() body: any) {
    return this.followService.create(body);
  }

  @Post('accept/:followingUserId')
  async followUser(@Param('followingUserId') followingUserId: number, @Req() req: any) {
    const followedId = req.user.userId;
    return this.followService.accept(followingUserId, followedId);
 
  }
  @Post('deny/:followingUserId')
  async denyUser(@Param('followingUserId') followingUserId: number, @Req() req: any) {
    const followedId = req.user.userId;
    return this.followService.unfollowUser(followingUserId, followedId);
 
  }
  @Delete(':followedUserId')
  async unfollowUser(@Param('followedUserId') followedUserId: number, @Req() req: any) {
    const followingUserId = req.user.userId;
    return this.followService.unfollowUser(followingUserId, followedUserId);
  }
}
