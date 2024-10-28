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
  tableName: 'tbl_post_report',
  timestamps: true,
})
export class PostReport extends Model<PostReport> {
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
    field: 'reporter_id',
  })
  reporter_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  report_reason: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  report_description: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  report_status: string;

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
