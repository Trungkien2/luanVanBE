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
  tableName: 'tbl_conversations',
  timestamps: true,
})
export class Conversation extends Model<Conversation> {
  @Column({
    type: DataType.CHAR(36),
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  })
  id: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

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
}
