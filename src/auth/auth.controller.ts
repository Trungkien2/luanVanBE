import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from 'src/core/filters/BaseExceptionFilter.filter';
import { EmailService } from 'src/mail/mail.service';
import {
  LoginUserDTO,
  MailOTPDTO,
  OTPCodeDTO,
  SignUpUserDTO,
} from 'src/user/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(BaseExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    res.redirect('http://localhost:3000/login-google?user=' + JSON.stringify(user));
  }

  @Post('send-otp')
  @ApiBody({ type: MailOTPDTO })
  async sendOtp(@Body('email') email: string) {
    // Generate a random OTP (you can change this logic as per your needs)
    const otp = this.generateOtp();

    // Send the OTP via email
    await this.emailService.sendOtpEmail(email, otp);

    // Optionally, store the OTP in the database or cache for validation
    return {
      message: 'OTP sent successfully',
      email,
      otp, // For testing purposes (remove in production)
    };
  }
  @Post('verify-otp')
  @ApiBody({ type: OTPCodeDTO })
  async verifyOTP(@Body('otp') otp: string) {
    return this.emailService.verifyOtp(otp);
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
  }
}
