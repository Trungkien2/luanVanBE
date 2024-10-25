import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService extends CrudService<Favorite> {
  constructor() {
    super(Favorite);
  }
}
