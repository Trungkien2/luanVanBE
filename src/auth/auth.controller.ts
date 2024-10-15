import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, SignUpUserDTO } from 'src/user/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
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
}
