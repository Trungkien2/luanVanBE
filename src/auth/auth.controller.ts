import {
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, SignUpUserDTO } from 'src/user/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiBody({ type: SignUpUserDTO })
  signUp(@Body() signUpUserDTO: SignUpUserDTO) {
    return this.authService.signUp(signUpUserDTO);
  }
  @Post('/login')
  @ApiBody({ type: LoginUserDTO })
  login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }
  @Get('/google')
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}
  
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    res.redirect('http://localhost:3000?user=' + JSON.stringify(user));
  }
}
