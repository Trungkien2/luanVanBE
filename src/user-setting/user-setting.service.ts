import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { UserSetting } from './entities/user-setting.entity';

@Injectable()
export class UserSettingService extends CrudService<UserSetting> {
  constructor() {
    super(UserSetting);
  }
}
