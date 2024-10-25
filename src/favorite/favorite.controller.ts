import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { FavoriteService } from './favorite.service';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('favorite')
@ApiTags('favorite')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class FavoriteController extends CrudController<FavoriteService> {
  constructor(private readonly favoriteService: FavoriteService) {
    super(favoriteService);
  }
}
