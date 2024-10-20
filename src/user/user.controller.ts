import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')  
@Controller('user')
export class UserController extends CrudController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile() {
    return { message: 'This is a protected route' };
  }

  
}


