import { FAVORITE_REPOSITORY } from 'src/core/contants';
import { Favorite } from './entities/favorite.entity';

export const favoriteProvider = [
  {
    provide: FAVORITE_REPOSITORY,
    useValue: Favorite,
  },
];
