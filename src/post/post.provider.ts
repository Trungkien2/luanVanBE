import { POST_REPOSITORY } from 'src/core/contants';
import { Post } from './entities/post.entity';
export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: Post,
  },
];
