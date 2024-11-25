import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'sequelize-typescript';
import { CrudService } from 'src/core/Base/crud.service';
import { FOLLOW_REPOSITORY, USER_REPOSITORY } from 'src/core/contants';
import { BaseException } from 'src/core/exception';
import { EXCEPTION } from 'src/core/exception/exception';
import { User } from './user.entity';
import { Op, Transaction } from 'sequelize';
import { QueryInfoDto } from 'src/core/interface/query-info.dto';
import { Follow } from 'src/follow/entities/follow.entity';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: Repository<User>,
    @Inject(FOLLOW_REPOSITORY)
    private readonly followRepository: Repository<Follow>,
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

  async getProfile() {
    return 'profile';
  }
  async getUserUnfollow(queryInfo?: QueryInfoDto) {
    const followedUserIds = await Follow.findAll({
      attributes: ['followed_user_id'],
      where: {
        following_user_id: queryInfo.where?.user_id, // Lấy danh sách những người dùng đã được user này theo dõi
      },
    });
    const followedIds = followedUserIds.map(
      (follow) => follow.followed_user_id,
    );

    // Lấy danh sách người dùng chưa theo dõi
    const usersNotFollowed = await User.findAndCountAll({
      ...queryInfo,
      where: {
        [Op.and]: [
          {
            id: {
              [Op.notIn]: followedIds, // Người dùng không nằm trong danh sách đã theo dõi
            },
          },
          {
            id: {
              [Op.ne]: queryInfo.where?.user_id, // Loại bỏ chính user hiện tại
            },
          },
        ],
      },
    });
    return {
      usersNotFollowed,
      pagination: {
        curentPage: queryInfo.page,
        nextPage: queryInfo?.page + 1,
        prevPage: queryInfo?.page - 1,
        limit: queryInfo?.limit,
      },
    };
  }
}
