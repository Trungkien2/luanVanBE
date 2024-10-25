import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_favorite',
  timestamps: true, // Nếu bạn sử dụng createdAt và updatedAt
})
export class Favorite extends Model<Favorite> {
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

  @ForeignKey(() => Post)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
    field: 'post_id',
  })
  post_id: string;

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