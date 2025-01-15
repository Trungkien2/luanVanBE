import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Post } from './entities/post.entity';
import { QueryInfoDto } from 'src/core/interface/query-info.dto';
import { FOLLOW_REPOSITORY, POST_REPOSITORY } from 'src/core/contants';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Follow } from 'src/follow/entities/follow.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Op } from 'sequelize';
import { User } from 'src/user/user.entity';
import { getPagination } from 'src/core/helper';
import { Comment } from 'src/comment/entities/comment.entity';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PostService extends CrudService<Post> {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: Repository<Post>,
    @Inject(FOLLOW_REPOSITORY)
    private readonly followRepository: Repository<Follow>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    super(Post);
  }
  async getPostByFollow(queryInfo?: QueryInfoDto) {
    const userId = queryInfo?.where?.user_id;
    const limit = queryInfo?.limit;
    const offset = queryInfo?.offset;

    // Get the list of user IDs that the user is friends with
    const friends = await Follow.findAll({
      attributes: ['following_user_id', 'followed_user_id'],
      where: {
        [Op.or]: [
          { following_user_id: userId, status: 'ACCEPT' },
          { followed_user_id: userId, status: 'ACCEPT' },
        ],
      },
    });

    const friendIds = friends.map((friend) =>
      friend.following_user_id === userId ? friend.followed_user_id : friend.following_user_id,
    );

    // Include the user's own ID
    friendIds.push(userId);

    const posts = await this.postRepository.findAndCountAll({
      attributes: [
        'id',
        'createdAt',
        'body',
        'media',
        'status',
        'visibility',
        [
          Sequelize.fn('COUNT', Sequelize.col('favoriteList.id')),
          'like_count',
        ],
        [
          Sequelize.fn('COUNT', Sequelize.col('commentList.id')),
          'comment_count',
        ],
        [
          Sequelize.literal(
            `EXISTS(SELECT 1 FROM tbl_favorite WHERE tbl_favorite.post_id = Post.id AND tbl_favorite.user_id = ${userId})`,
          ),
          'isLiked',
        ],
        [
          Sequelize.literal(
            `(COUNT(favoriteList.id) * 0.7) + ((NOW() - UNIX_TIMESTAMP(Post.createdAt)) * 0.3)`,
          ),
          'score',
        ],
      ],
      include: [
        {
          model: Favorite,
          as: 'favoriteList',
          attributes: ['id'],
          required: false,
        },
        {
          model: Comment,
          as: 'commentList',
          attributes: [],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'picture', 'email'],
        },
        {
          model: User,
          as: 'allowedUsers',
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
      group: ['Post.id', 'Post.createdAt'],
      order: [[Sequelize.literal('score'), 'DESC']],
      where: {
        user_id: {
          [Op.in]: friendIds,
        },
        status: 'POST',
        [Op.or]: [
          { visibility: 'public' },
          { visibility: 'followers' },
          {
            visibility: 'private',
            [Op.or]: [
              { '$allowedUsers.id$': userId },
              { user_id: userId },
            ],
          },
        ],
      },
      subQuery: false,
      limit,
      offset,
    });

    const pagination = getPagination(queryInfo.page, limit, posts.count.length);

    return {
      count: posts.count.length,
      rows: posts.rows,
      pagination,
    };
  }

  async getPostExplore(queryInfo?: QueryInfoDto) {
    const limit = queryInfo?.limit;
    const offset = queryInfo?.offset;

    const whereCondition: any = {
      ...queryInfo.where,
      status: 'POST',
      visibility: 'public',
    };

    if (queryInfo?.hashtag) {
      console.log("🚀 ~ PostService ~ getPostExplore ~ queryInfo?.hashtag:", queryInfo?.hashtag)
      whereCondition['$hashtags.name$'] = { [Op.like]: `%${queryInfo.hashtag}%` };
    }

    const trendingPosts = await this.postRepository.findAndCountAll({
      attributes: [
        'id',
        'media',
        'status',
        'visibility',
        [
          Sequelize.literal(
            '(COUNT(favoriteList.id) * 0.6) + (COUNT(commentList.id) * 0.4)',
          ),
          'score',
        ],
      ],
      include: [
        {
          model: Favorite,
          as: 'favoriteList',
          attributes: [],
        },
        {
          model: Comment,
          as: 'commentList',
          attributes: [],
        },
        { model: User, as: 'user', attributes: ['id', 'name', 'picture'] },
        {
          model: User,
          as: 'allowedUsers',
          attributes: ['id'],
          through: { attributes: [] },
        },
        {
          model: Hashtag,
          as: 'hashtags',
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
      group: ['Post.id', 'Post.createdAt'],
      order: [[Sequelize.literal('score'), 'DESC']],
      where: whereCondition,
      subQuery: false,
      limit,
      offset,
    });

    const pagination = getPagination(
      queryInfo.page,
      limit,
      trendingPosts.count.length,
    );
    const result = {
      count: trendingPosts.count.length,
      rows: trendingPosts.rows,
      pagination,
    };

    return result;
  }

  async getReelPosts(queryInfo?: QueryInfoDto, userId?: number) {
    const limit = parseInt(queryInfo?.limit as any, 10) || 10;
    const offset = parseInt(queryInfo?.offset as any, 10) || 0;
    let whereCondition = { ...queryInfo.where, status: 'REEL' };

    if (queryInfo?.filterType === 'following') {
      const followedUserIds = await this.followRepository.findAll({
        attributes: ['followed_user_id'],
        where: {
          following_user_id: userId,
          status: 'ACCEPT',
        },
      });
      const followedIds = followedUserIds.map((follow) => follow.followed_user_id);
      whereCondition = { ...whereCondition, user_id: { [Op.in]: followedIds } };
    }

    if (queryInfo?.name) {
      whereCondition = {
        ...whereCondition,
        '$user.name$': { [Op.like]: `%${queryInfo.name}%` },
      };
    }

    const reelPosts = await this.postRepository.findAndCountAll({
      attributes: [
        'id',
        'media',
        'status',
        'body',
        'visibility',
        [
          Sequelize.literal(
            '(COUNT(favoriteList.id) * 0.6) + (COUNT(commentList.id) * 0.4)',
          ),
          'score',
        ],
      ],
      include: [
        {
          model: Favorite,
          as: 'favoriteList',
          attributes: ['id'],
          required: false,
        },
        {
          model: Comment,
          as: 'commentList',
          attributes: [],
        },
        { model: User, as: 'user', attributes: ['id', 'name', 'picture'] },
        {
          model: User,
          as: 'allowedUsers',
          attributes: ['id'],
          through: { attributes: [] },
        },
      ],
      group: ['Post.id', 'Post.createdAt'],
      order: [[Sequelize.literal('score'), 'DESC']],
      where: {
        ...whereCondition,
        [Op.or]: [
          { visibility: 'public' },
          { visibility: 'followers' },
          {
            visibility: 'private',
            '$allowedUsers.id$': userId,
          },
        ],
      },
      subQuery: false,
      limit,
      offset,
    });

    const pagination = getPagination(
      queryInfo.page,
      limit,
      reelPosts.count.length,
    );

    return {
      count: reelPosts.count.length,
      rows: reelPosts.rows,
      pagination,
    };
  }

  async countLikes(postId: string): Promise<number> {
    return await this.postRepository.count({
      include: [
        {
          model: Favorite,
          as: 'favoriteList',
          where: { post_id: postId },
          required: true,
        },
      ],
    });
  }

  async countComments(postId: string): Promise<number> {
    return await this.postRepository.count({
      include: [
        {
          model: Comment,
          as: 'commentList',
          where: { post_id: postId },
          required: true,
        },
      ],
    });
  }

  async isPostLikedByUser(postId: string, userId: string): Promise<boolean> {
    const count = await this.postRepository.count({
      include: [
        {
          model: Favorite,
          as: 'favoriteList',
          where: { post_id: postId, user_id: userId },
          required: true,
        },
      ],
    });
    return count > 0;
  }

  async delete(queryInfo: QueryInfoDto): Promise<any> {
    const postId = queryInfo.where.id;

    // Delete related favorites
    await Favorite.destroy({
      where: { post_id: postId },
    });

    // Delete related comments
    await Comment.destroy({
      where: { post_id: postId },
    });

    // Delete the post
    return await this.postRepository.destroy({
      where: { id: postId },
    });
  }
}
