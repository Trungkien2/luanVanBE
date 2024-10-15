import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BaseException } from 'src/core/exception';
import { EXCEPTION } from 'src/core/exception/exception';
import { LoginUserDTO, SignUpUserDTO } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpUserDTO: SignUpUserDTO) {
    try {
      const { email, name, password } = signUpUserDTO;

      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        return new BaseException(EXCEPTION.EMAIL_ALREADY_REGISTERED, 'auth');
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await this.userService.create({
        email,
        name,
        password: hashedPassword,
      });

      return new BaseException(EXCEPTION.USER_CREATED, 'auth');
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during registration',
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUserDTO: LoginUserDTO) {
    try {
      const { email, password } = loginUserDTO;
      // find email is exsited
      const existingUser:User = await this.userService.findByEmail(email);
      if (!existingUser) {
        return new BaseException(EXCEPTION.USER_NOT_FOUND, 'auth');
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        return new BaseException(EXCEPTION.PASSWORD_IS_NOT_CORRECT, 'auth');
      }

      return  this.convertStringToJwt(existingUser.id,existingUser.email)
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during login',
        },
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async convertStringToJwt(userId: string, email: string): Promise<{access_token : string}> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString:string = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRECT'),
    });

    return {
      access_token: jwtString,
    };
  }
}
