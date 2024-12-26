import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';
import { TransactionRequired } from 'src/core/decorator/transactions.decorator';
import { updatePasswordDTO } from './user.dto';
import { UserService } from './user.service';
import {
  ApiQueryInfo,
  QueryInfo,
} from 'src/core/decorator/query-info.decorator';
import { QueryInfoDto } from 'src/core/interface/query-info.dto';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController extends CrudController<UserService> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() req: any) {
    return this.userService.getProfile();
  }

  @Post('/update-password')
  @ApiBody({ type: updatePasswordDTO })
  @TransactionRequired()
  updatepassWord(
    @Body() updatepasswordbody: updatePasswordDTO,
    @Req() req: any,
  ) {
    const transaction = req.transaction;
    return this.userService.updatePassWord(updatepasswordbody, transaction);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/un-follow')
  @ApiQueryInfo()
  getUserNotFollow(@QueryInfo() queryInfo: QueryInfoDto, @Req() req: any) {
    const userId = req.user.userId; // Lấy userId từ req.user
    queryInfo.where = { ...queryInfo.where, user_id: userId };
    return this.userService.getUserUnfollow(queryInfo);
  }

  @Get(':id/details')
  async getUserDetails(@Param('id') id: number) {
    return this.userService.getUserDetails(id);
  }
}
