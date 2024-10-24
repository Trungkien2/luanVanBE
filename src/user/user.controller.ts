import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CrudController } from 'src/core/Base/crud.controller';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { updatePasswordDTO } from './user.dto';
import { TransactionRequired } from 'src/core/decorator/transactions.decorator';

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

  @Post('/update-password')
  @ApiBody({ type: updatePasswordDTO })
  @TransactionRequired()
  updatepassWord(
    @Body() updatepasswordbody: updatePasswordDTO,
    @Req() req: any,
  ) {
    const transaction = req.transaction;
    console.log('🚀 ~ UserController ~ transaction:', transaction);
    return this.userService.updatePassWord(updatepasswordbody, transaction);
  }
}
