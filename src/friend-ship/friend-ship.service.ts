import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { FriendShip } from './entities/friend-ship.entity';

@Injectable()
export class FriendShipService extends CrudService<FriendShip> {
  constructor() {
    super(FriendShip);
  }
}
