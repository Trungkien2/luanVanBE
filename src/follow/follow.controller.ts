import { Controller, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

@Controller('follow')
@ApiTags('Follow')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class FollowController extends CrudController<FollowService> {
  constructor(private readonly followService: FollowService) {
    super(followService);
  }
}
