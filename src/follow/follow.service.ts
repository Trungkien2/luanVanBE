import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService extends CrudService<Follow> {
  constructor() {
    super(Follow);
  }
}
