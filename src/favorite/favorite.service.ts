import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Favorite } from './entities/favorite.entity';
import { FAVORITE_REPOSITORY } from 'src/core/contants';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class FavoriteService extends CrudService<Favorite> {
  constructor( @Inject(FAVORITE_REPOSITORY) private readonly favoriteRepository: Repository<Favorite>) {
    super(Favorite);
  }

  async removeLike(postId: string, userId: string) {
    const like = await this.favoriteRepository.findOne({
      where: { post_id: postId, user_id: userId },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await like.destroy();


    return {
      message: 'Like removed successfully',
    
    };
  }

}
