import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { FOLLOW_REPOSITORY } from 'src/core/contants';
import { Repository } from 'sequelize-typescript';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService extends CrudService<Follow> {
  constructor(
    @Inject(FOLLOW_REPOSITORY)
    private readonly followRepository: Repository<Follow>,
  ) {
    super(Follow);
  }

  async unfollowUser(followingUserId: number, followedUserId: number) {
    return await this.followRepository.destroy
    (
     {
      where: {
        following_user_id: followingUserId,
        followed_user_id: followedUserId,
      },
    });
  }
  async accept(followingUserId: number, followedUserId: number) {
    return await this.followRepository.update(
      {
        status: 'ACCEPT',
      },{
      where: {
        following_user_id: followingUserId,
        followed_user_id: followedUserId,
      },
    });
  }
}
