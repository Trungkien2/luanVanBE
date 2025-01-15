import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { CrudService } from 'src/core/Base/crud.service';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagService extends CrudService<Hashtag> {
  constructor() {
    super(Hashtag);
  }
}
