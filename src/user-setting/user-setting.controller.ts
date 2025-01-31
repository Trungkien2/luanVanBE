import { Controller, UseGuards } from '@nestjs/common';
import { CrudController } from 'src/core/Base/crud.controller';
import { UserSettingService } from './user-setting.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

@Controller('user-setting')
@ApiTags('User Setting')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class UserSettingController extends CrudController<UserSettingService> {
  constructor(private readonly userSettingService: UserSettingService) {
    super(userSettingService);
  }
}
