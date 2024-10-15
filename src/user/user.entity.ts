import { Table, Column, Model, DataType, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'tbl_user',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['MALE', 'FEMALE'],
    allowNull: true,
  })
  gender: string;

  @Column({
    type : DataType.STRING,
    allowNull : true
  })
  bio: string;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  created_at_unix_timestamp: number;
  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  updated_at_unix_timestamp: number;

  @Column({
    type: DataType.DATE,
  })
  deleted_at: string;

 
}
