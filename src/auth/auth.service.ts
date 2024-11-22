import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Repository } from 'sequelize-typescript';
import { USER_REPOSITORY } from 'src/core/contants';
import { BaseException } from 'src/core/exception';
import { EXCEPTION } from 'src/core/exception/exception';
import { EmailService } from 'src/mail/mail.service';
import { LoginUserDTO, SignUpUserDTO } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject(USER_REPOSITORY) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async signUp(signUpUserDTO: SignUpUserDTO) {
    const { email, name, password } = signUpUserDTO;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BaseException(
        EXCEPTION.EMAIL_ALREADY_REGISTERED,
        'auth',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userService.create({
      email,
      name,
      password: hashedPassword,
    });

    return new BaseException(EXCEPTION.USER_CREATED, 'auth');
  }

  async login(loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;

    const existingUser: User = await this.userService.findByEmail(email);
    if (!existingUser) {
      throw new BaseException(
        EXCEPTION.USER_NOT_FOUND,
        'auth',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new BaseException(
        EXCEPTION.PASSWORD_IS_NOT_CORRECT,
        'auth',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.convertStringToJwt(existingUser.id, existingUser.email);
  }

  async convertStringToJwt(
    userId: string,
    email: string,
  ): Promise<{ message: { en: string }; access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString: string = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
    });

    return {
      message: {
        en: 'Login success',
      },
      access_token: jwtString,
    };
  }

  async validateUser(profile: {
    _json: {
      sub: string;
      name: string;
      given_name: string;
      family_name: string;
      picture: string;
      email: string;
      email_verified: boolean;
    };
  }): Promise<any> {
    const t = await this.userService.transaction();

    // Kiểm tra xem email có được xác thực hay không
    if (!profile._json.email_verified) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email is not verified',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userService.findByEmail(
      profile._json.email,
    );
    if (existingUser) {
      const cachedUser = await this.cacheService.get(
        `user:${existingUser.dataValues.id}`,
      );
      if (!cachedUser) {
        if (
          existingUser.dataValues.name !== profile._json.name ||
          existingUser.dataValues.picture !== profile._json.picture
        ) {
          await this.userRepository.update(
            { name: profile._json.name, picture: profile._json.picture },
            {
              where: {
                id: existingUser.dataValues.id,
              },
              transaction: t,
            },
          );
        }

        await this.cacheService.set(
          `user:${existingUser.dataValues.id}`,
          JSON.stringify(existingUser),
          3600,
        );
      }

      await t.commit();
      return await this.convertStringToJwt(
        existingUser.dataValues.id,
        existingUser.dataValues.email,
      );
    } else {
      const newUser = await this.userService.create({
        email: profile._json.email,
        name: profile._json.name,
        password: '',
      });

      await t.commit();
      return await this.convertStringToJwt(newUser.id, newUser.email);
    }
  }
}
