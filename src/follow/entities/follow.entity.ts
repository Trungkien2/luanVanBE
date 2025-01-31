import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_follow',
  timestamps: true,
})
export class Follow extends Model<Follow> {
  @Column({
    type: DataType.CHAR(36),
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'following_user_id',
  })
  following_user_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'followed_user_id',
  })
  followed_user_id: number;

  @Column({
    type: DataType.BIGINT,
    validate: {
      min: 0,
    },
  })
  created_date_unix_timestamp: number;

  @Column({
    type: DataType.BIGINT,
    validate: {
      min: 0,
    },
  })
  updated_at_unix_timestamp: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "PENDING",
    validate: {
      isIn: {
        args: [["PENDING", "ACCEPT", "DENY"]],
        msg: "Status must be one of 'PENDING', 'ACCEPT', or 'DENY'.",
      },
    },
  })
  status: string;
  
  @BelongsTo(() => User, 'following_user_id')
  followerUser: User;

  @BelongsTo(() => User, 'followed_user_id')
  followedUser: User;
}
