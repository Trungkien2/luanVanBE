import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'sequelize-typescript';
import { CrudService } from 'src/core/Base/crud.service';
import { USER_REPOSITORY } from 'src/core/contants';
import { BaseException } from 'src/core/exception';
import { EXCEPTION } from 'src/core/exception/exception';
import { User } from './user.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: Repository<User>,
  ) {
    super(User);
  }
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async updatePassWord(
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    transaction?: Transaction,
  ): Promise<any> {
    // check  email exist in db
    const existingUser = await this.findByEmail(email);
    if (!existingUser) {
      throw new BaseException(
        EXCEPTION.EMAIL_DOSE_NOT_EXIST,
        'user',
        HttpStatus.BAD_REQUEST,
      );
    }
    // check password not the same with the old password

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (isPasswordValid) {
      throw new BaseException(
        EXCEPTION.PASSWORD_ALREADY_EXISTS,
        'user',
        HttpStatus.BAD_REQUEST,
      );
    }
    // update new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userRepository.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: existingUser.id,
        },
        transaction,
      },
    );

    return new BaseException(EXCEPTION.USER_CHANGEPASSWORD, 'user');
  }
}
