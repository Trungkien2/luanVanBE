import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Follow } from 'src/follow/entities/follow.entity';
import { Post } from 'src/post/entities/post.entity';

@Table({
  tableName: 'tbl_user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  user_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['MALE', 'FEMALE'],
    allowNull: true,
  })
  gender: string;
  @Column({
    type: DataType.ENUM,
    values: ['IN_APP', 'GOOGLE'],
    allowNull: true,
    defaultValue: 'IN_APP',
  })
  account_type: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  picture: string;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  created_at_unix_timestamp: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  updated_at_unix_timestamp: number;

  @Column({
    type: DataType.DATE,
  })
  deleted_at: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Follow, { foreignKey: 'following_user_id', as: 'followings' })
  followings: Follow[];

  @HasMany(() => Follow, { foreignKey: 'followed_user_id', as: 'followers' })
  followers: Follow[];
}
