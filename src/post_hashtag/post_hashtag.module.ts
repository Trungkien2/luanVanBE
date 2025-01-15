import { Module } from '@nestjs/common';
import { PostHashtagService } from './post_hashtag.service';
import { PostHashtagController } from './post_hashtag.controller';

@Module({
  controllers: [PostHashtagController],
  providers: [PostHashtagService]
})
export class PostHashtagModule {}
