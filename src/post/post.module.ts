import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { postsProviders } from './post.provider';

@Module({
  controllers: [PostController],
  providers: [PostService, ...postsProviders],
  exports: [PostService],
})
export class PostModule {}
