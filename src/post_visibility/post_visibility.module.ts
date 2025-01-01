import { Module } from '@nestjs/common';
import { PostVisibilityService } from './post_visibility.service';
import { PostVisibilityController } from './post_visibility.controller';
import { PostVisibility } from './entities/post_visibility.entity';

@Module({
  controllers: [PostVisibilityController],
  providers: [PostVisibilityService],
})
export class PostVisibilityModule {}
