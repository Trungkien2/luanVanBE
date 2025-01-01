import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { PostVisibilityService } from './post_visibility.service';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('post-visibility')
@ApiTags('PostVisibility')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class PostVisibilityController extends CrudController<PostVisibilityService> {
  constructor(private readonly postVisibilityService: PostVisibilityService) {
    super(postVisibilityService);
  }
}
