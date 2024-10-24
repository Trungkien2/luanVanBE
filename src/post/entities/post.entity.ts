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
  tableName: 'tbl_post',
  timestamps: true, // Nếu bạn sử dụng createdAt và updatedAt
})
export class Post extends Model<Post> {
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
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  media: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  status: string;

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
