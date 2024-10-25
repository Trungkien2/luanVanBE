import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_user_setting',
  timestamps: true, // Nếu bạn sử dụng createdAt và updatedAt
})
export class UserSetting extends Model<UserSetting> {
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
    field: 'user_id',
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
  })
  privacy_level: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  notification_push: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_account_private: boolean;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  show_activity_status: boolean;

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

  @BelongsTo(() => User)
  user: User;
}
