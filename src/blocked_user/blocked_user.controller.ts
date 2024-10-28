import { Controller, UseGuards } from '@nestjs/common';
import { BlockedUserService } from './blocked_user.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

@Controller('blocked-user')
@ApiTags('Blocked User')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class BlockedUserController extends CrudController<BlockedUserService> {
  constructor(private readonly blockedUserService: BlockedUserService) {
    super(blockedUserService);
  }
}
