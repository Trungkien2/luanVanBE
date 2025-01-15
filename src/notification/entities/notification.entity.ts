import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { User } from 'src/user/user.entity';
  
  @Table({
    tableName: 'tbl_notification',
    timestamps: true,
  })
  export class Notification extends Model<Notification> {
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

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: 'sender_id',
    })
    sender_id: number;
  
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    type: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    message: string;
  
    @Column({
      type: DataType.BOOLEAN,
      defaultValue: false,
    })
    is_read: boolean;

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