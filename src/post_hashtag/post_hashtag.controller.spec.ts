import { Test, TestingModule } from '@nestjs/testing';
import { PostHashtagController } from './post_hashtag.controller';
import { PostHashtagService } from './post_hashtag.service';

describe('PostHashtagController', () => {
  let controller: PostHashtagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostHashtagController],
      providers: [PostHashtagService],
    }).compile();

    controller = module.get<PostHashtagController>(PostHashtagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
