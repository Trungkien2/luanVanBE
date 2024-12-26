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
    // lấy danh sách bài post của nhưng người mình follow
    // case 1: user chưa follow ai
    // lấy bài post của bản thân nếu có
    // sẽ lấy những bài post có số lượng like kết hợp với thời gian đăng bài sắp thêm theo lớn nhất
    // score = (likes * 0.7) + (newness_score * 0.3)
    // case 2: user có follow người khác rồi
    // ưu tiên bài post của bản thân lên cao nhất
    // nếu bài viết của bản thân quá nhiều sẽ giới hạn lại lấy 2-3 bài mới nhất
    // nếu user không đăng bài nào thì chỉ lấy nhưng bài của những người follow
    // sắp xếp tương tự theo thuộc toán bên trên
    // nếu danh sách follow quá ích thì sẽ lấy những người đang thuộc top trending
    const userId = queryInfo?.where?.user_id;
    const limit = queryInfo?.limit;
    const offset = queryInfo?.offset;
    const followedUserIds = await Follow.findAll({
      attributes: ['followed_user_id'],
      where: {
        following_user_id: queryInfo.where?.user_id, // Lấy danh sách những người dùng đã được user này theo dõi
      },
    });
    const followedIds = followedUserIds.map(
      (follow) => follow.followed_user_id,
    );

    if (followedIds?.length === 0) {
      const countResult = await this.postRepository.count({
        logging: console.log,
        include: [
          {
            model: User,
            as: 'user',
            required: false, // Không làm ảnh hưởng tới số lượng nếu không có user liên quan
          },
          {
            model: Favorite,
            as: 'favoriteList',
            required: false,
          },
        ],
      });
      const post = await this.postRepository.findAll({
        attributes: [
          'id',
          'createdAt',
          'body',
          'media',
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
        ],
        group: ['Post.id', 'Post.createdAt'],
        order: [[Sequelize.literal('score'), 'DESC']],
        subQuery: false,
        limit,
        offset,
      });
      const pagination = getPagination(queryInfo.page, limit, countResult);
      return {
        count: countResult, // Tổng số bài viết
        rows: post,
        pagination, // Danh sách bài viết
      };
    } else if (followedIds?.length > 0) {
      const userPostsData = await this.postRepository.findAndCountAll({
        logging: console.log,
        attributes: [
          'id',
          'createdAt',
          'body',
          'media',
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
            attributes: [],
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
        ],
        where: {
          user_id: userId, // Lấy bài viết của chính user
        },
        group: ['Post.id', 'Post.createdAt'],
        order: [[Sequelize.literal('score'), 'DESC']],
        subQuery: false,
        limit: 3, // Lấy tối đa 3 bài viết của user
      });

      // Lấy bài viết của những người user đang follow
      const followedPostsData = await this.postRepository.findAndCountAll({
        logging: console.log,
        attributes: [
          'id',
          'createdAt',
          'body',
          'media',
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
            attributes: [],
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
        ],
        where: {
          user_id: {
            [Op.in]: followedIds, // Lấy bài viết của những người user đang follow
          },
        },
        group: ['Post.id', 'Post.createdAt'],
        order: [[Sequelize.literal('score'), 'DESC']],
        subQuery: false,
        limit, // Giới hạn bài viết lấy ra theo yêu cầu
        offset,
      });

      const allPosts = [...userPostsData.rows, ...followedPostsData.rows];
      const totalCount =
        userPostsData.count.length + followedPostsData.count.length;
      const pagination = getPagination(queryInfo.page, limit, totalCount);

      return {
        totalCount,
        rows: allPosts,
        pagination,
      };
    }

    return 'get posst by follow';
  }

  async getPostExplore(queryInfo?: QueryInfoDto) {
    const limit = queryInfo?.limit;
    const offset = queryInfo?.offset;
    // 1. Lấy bài viết trending

    // Key cache dựa trên limit và offset
    const cacheKey = `explore:posts:limit=${limit}:offset=${offset}`;
    const cacheData = await this.cacheService.get(cacheKey);
    if (cacheData) {
      return JSON.parse(cacheData as any);
    }

    const trendingPosts = await this.postRepository.findAndCountAll({
      attributes: [
        'id',
        'media',
        "status" ,
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
      ],
      group: ['Post.id', 'Post.createdAt'],
      order: [[Sequelize.literal('score'), 'DESC']],
      where: { ...queryInfo.where,status : "POST" },
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
    // 3. Lưu kết quả vào cache với thời gian hết hạn (TTL)
    await this.cacheService.set(
      cacheKey,
      JSON.stringify(result),
      10 * 60 * 1000,
    );
    return result;
  }

  async getReelPosts(queryInfo?: QueryInfoDto) {
    const limit = parseInt(queryInfo?.limit as any, 10) || 10;
    const offset = parseInt(queryInfo?.offset as any, 10) || 0;
    let whereCondition = { ...queryInfo.where, status: 'REEL' };
    if(queryInfo?.filterType === 'following'){
      const followedUserIds = await this.followRepository.findAll({
        attributes: ['followed_user_id'],
        where: {
          following_user_id: queryInfo.where?.user_id,
        },
      });
      const followedIds = followedUserIds.map(follow => follow.followed_user_id);
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
        "body",
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
      ],
      group: ['Post.id', 'Post.createdAt'],
      order: [[Sequelize.literal('score'), 'DESC']],
      where:whereCondition,
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
}
