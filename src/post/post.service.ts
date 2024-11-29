import { Inject, Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Post } from './entities/post.entity';
import { QueryInfoDto } from 'src/core/interface/query-info.dto';
import { FOLLOW_REPOSITORY, POST_REPOSITORY } from 'src/core/contants';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Follow } from 'src/follow/entities/follow.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Injectable()
export class PostService extends CrudService<Post> {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: Repository<Post>,
    @Inject(FOLLOW_REPOSITORY)
    private readonly followRepository: Repository<Follow>,
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
    const field = queryInfo.attributes;
    console.log('🚀 ~ PostService ~ getPostByFollow ~ field:', field);
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
      const post = await this.postRepository.findAll({
        logging: console.log,
        attributes: [
          'id',
          'createdAt',
          [
            Sequelize.fn('COUNT', Sequelize.col('favoriteList.id')),
            'like_count',
          ],
          [
            Sequelize.literal(
              `(COUNT(favoriteList.id) * 0.7) + ((NOW() - UNIX_TIMESTAMP(tbl_post.createdAt)) * 0.3)`,
            ),
            'score',
          ],
        ],
        include: [
          {
            model: Favorite,
            as: 'favoriteList', // Alias phải khớp với định nghĩa
            attributes: [],
          },
        ],
        group: ['tbl_post.id', 'tbl_post.createdAt'], // Khớp với các cột không tổng hợp
        order: [[Sequelize.literal('score'), 'DESC']],
        limit,
        offset,
      });
      return post;
    } else {
    }

    return 'get posst by follow';
  }
}
