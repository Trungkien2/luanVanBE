import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
  } from 'sequelize-typescript';
import { Hashtag } from 'src/hashtag/entities/hashtag.entity';
  import { Post } from 'src/post/entities/post.entity';
  
  @Table({
    tableName: 'tbl_post_hashtag',
    timestamps: false,
  })
  export class PostHashtag extends Model<PostHashtag> {
    @ForeignKey(() => Post)
    @Column({
      type: DataType.CHAR(36),
      allowNull: false,
    })
    post_id: string;
  
    @ForeignKey(() => Hashtag)
    @Column({
      type: DataType.CHAR(36),
      allowNull: false,
    })
    hashtag_id: string;
  }