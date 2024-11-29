import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { postsProviders } from './post.provider';
import { followProviders } from 'src/follow/follow.provider';

@Module({
  controllers: [PostController],
  providers: [PostService, ...postsProviders, ...followProviders],
  exports: [PostService],
})
export class PostModule {}
