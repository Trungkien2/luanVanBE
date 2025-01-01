import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
  } from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
  import { User } from 'src/user/user.entity';
  
  @Table({
    tableName: 'tbl_post_visibility',
    timestamps: false,
  })
  export class PostVisibility extends Model<PostVisibility> {
    @ForeignKey(() => Post)
    @Column({
      type: DataType.CHAR(36),
      allowNull: false,
    })
    post_id: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    user_id: number;
  }