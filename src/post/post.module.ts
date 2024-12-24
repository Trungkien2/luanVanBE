import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { postsProviders } from './post.provider';
import { followProviders } from 'src/follow/follow.provider';
import { FavoriteService } from 'src/favorite/favorite.service';
import { favoriteProvider } from 'src/favorite/favorite.prodiver';

@Module({
  controllers: [PostController],
  providers: [PostService,FavoriteService, ...postsProviders, ...followProviders,...favoriteProvider],
  exports: [PostService],
})
export class PostModule {}
