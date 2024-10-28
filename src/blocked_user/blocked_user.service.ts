import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { BlockedUser } from './entities/blocked_user.entity';

@Injectable()
export class BlockedUserService extends CrudService<BlockedUser> {
  constructor() {
    super(BlockedUser);
  }
}
