import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_friend_ship',
  timestamps: true,
})
export class FriendShip extends Model<FriendShip> {
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
    field: 'user_id_1',
  })
  user_id_1: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id_2',
  })
  user_id_2: number;

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
