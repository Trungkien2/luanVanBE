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
  tableName: 'tbl_conversation_members',
  timestamps: true,
})
export class ConversationMember extends Model<ConversationMember> {
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

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'conversation_id',
  })
  conversation_id: string;

  @Column({
    type: DataType.BIGINT,
    validate: {
      min: 0,
    },
  })
  joined_at: number;

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

  @BelongsTo(() => Conversation)
  conversation: Conversation;
}
