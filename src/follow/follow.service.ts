import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { CrudService } from 'src/core/Base/crud.service';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService extends CrudService<Follow> {
  constructor() {
    super(Follow);
  }
}
