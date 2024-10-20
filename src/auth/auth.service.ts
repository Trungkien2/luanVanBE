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
    private readonly emailService: EmailService
  ) {}

  async signUp(signUpUserDTO: SignUpUserDTO) {
    try {
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
    } catch (error) {
      if (error instanceof BaseException) {
        throw new HttpException(
          {
            statusCode: error.status || HttpStatus.BAD_REQUEST,
            message: error.toJSON(),
          },
          error.status || HttpStatus.BAD_REQUEST,
        );
      }

      // Fallback for any other errors
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during registration',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUserDTO: LoginUserDTO) {
    try {
      const { email, password } = loginUserDTO;
      // find email is exsited
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
    } catch (error) {
      if (error instanceof BaseException) {
        throw new HttpException(
          {
            statusCode: error.status || HttpStatus.BAD_REQUEST,
            message: error.toJSON(),
          },
          error.status || HttpStatus.BAD_REQUEST,
        );
      }

      // Fallback for any other errors
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during login',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // common method
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
      secret: this.configService.get('JWT_SECRECT'),
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
    try {
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
        // Kiểm tra xem Redis có cache người dùng hay không
        const cachedUser = await this.cacheService.get(
          `user:${existingUser.dataValues.id}`,
        );

   

        if (!cachedUser) {
          // Chỉ cập nhật nếu có thay đổi về tên hoặc hình ảnh
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

          // Cache giá trị trong Redis
          await this.cacheService.set(
            `user:${existingUser.dataValues.id}`,
            JSON.stringify(existingUser),
            3600, // Cache trong 1 giờ
          );
        }

        // Commit transaction sau khi cập nhật
        await t.commit();

        // Trả về JWT token
        return await this.convertStringToJwt(
          existingUser.dataValues.id,
          existingUser.dataValues.email,
        );
      } else {
        // Nếu người dùng chưa tồn tại, tạo mới
        const newUser = await this.userService.create({
          email: profile._json.email,
          name: profile._json.name,
          password: '', // Có thể thay đổi nếu cần lưu trữ mật khẩu
        });

        // Commit transaction sau khi tạo mới
        await t.commit();

        // Trả về JWT token cho người dùng mới
        return await this.convertStringToJwt(newUser.id, newUser.email);
      }
    } catch (error) {
      // Rollback transaction nếu có lỗi xảy ra
      await t.rollback();

      // Xử lý lỗi cụ thể nếu có
      if (error instanceof BaseException) {
        throw new HttpException(
          {
            statusCode: error.status || HttpStatus.BAD_REQUEST,
            message: error.toJSON(),
          },
          error.status || HttpStatus.BAD_REQUEST,
        );
      }

      // Xử lý các lỗi khác
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during login',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
