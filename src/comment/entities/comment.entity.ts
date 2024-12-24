import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_comment',
  timestamps: true, // Nếu bạn sử dụng createdAt và updatedAt
})
export class Comment extends Model<Comment> {
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
    type: DataType.STRING,
  })
  content: string;
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
  @BelongsTo(() => Post)
  post: Post;
}
