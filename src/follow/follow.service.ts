import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { FOLLOW_REPOSITORY } from 'src/core/contants';
import { Repository } from 'sequelize-typescript';
import { Follow } from './entities/follow.entity';
import { User } from 'src/user/user.entity';
import { Op } from 'sequelize';

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

  async getFriends(userId: number) {
    const friends = await this.followRepository.findAll({
      where: {
        [Op.or]: [
          { following_user_id: userId, status: 'ACCEPT' },
          { followed_user_id: userId, status: 'ACCEPT' },
        ],
      },
      include: [
        {
          model: User,
          as: 'followerUser',
          attributes: ['id', 'name', 'picture'],
        },
        {
          model: User,
          as: 'followedUser',
          attributes: ['id', 'name', 'picture'],
        },
      ],
    });

    return friends.map((friend) => {
      const isFollowing = friend.following_user_id === userId;
      return isFollowing ? friend.followedUser : friend.followerUser;
    });
  }
}
