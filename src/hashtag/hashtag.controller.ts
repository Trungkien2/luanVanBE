import { Controller } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('hashtag')
export class HashtagController extends CrudController<HashtagService> {
  constructor(private readonly hashtagService: HashtagService) {
    super(hashtagService);
  }

}
