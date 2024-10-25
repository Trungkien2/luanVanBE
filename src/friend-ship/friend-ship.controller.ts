import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';
import { FriendShipService } from './friend-ship.service';

@Controller('friend-ship')
@ApiTags('Friend Ship')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class FriendShipController extends CrudController<FriendShipService> {
  constructor(private readonly friendShipService: FriendShipService) {
    super(friendShipService);
  }
}
