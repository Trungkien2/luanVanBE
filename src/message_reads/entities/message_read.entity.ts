import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_message_reads',
  timestamps: true,
})
export class MessageRead extends Model<MessageRead> {
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

  @ForeignKey(() => Message)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'message_id',
  })
  message_id: string;

  @Column({
    type: DataType.BIGINT,
    validate: {
      min: 0,
    },
  })
  read_at: number;

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

  @BelongsTo(() => Message)
  message: Message;
}
