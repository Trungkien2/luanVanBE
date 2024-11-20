import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'tbl_message',
  timestamps: true,
})
export class Message extends Model<Message> {
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
    field: 'sender_id',
  })
  sender_id: number;

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'conversation_id',
  })
  conversation_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  message_type: string;

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
  sender: User;

  @BelongsTo(() => Conversation)
  conversation: Conversation;
}
