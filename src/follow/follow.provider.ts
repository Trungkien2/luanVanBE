import { FOLLOW_REPOSITORY } from 'src/core/contants';
import { Follow } from './entities/follow.entity';
export const followProviders = [
  {
    provide: FOLLOW_REPOSITORY,
    useValue: Follow,
  },
];
