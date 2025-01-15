import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
  } from 'sequelize-typescript';
  import { Post } from 'src/post/entities/post.entity';
import { PostHashtag } from 'src/post_hashtag/entities/post_hashtag.entity';
  
  @Table({
    tableName: 'tbl_hashtag',
    timestamps: true,
  })
  export class Hashtag extends Model<Hashtag> {
    @Column({
      type: DataType.CHAR(36),
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    })
    id: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    name: string;
  

    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
    })
    status: string;
  
    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    deleted_date: Date;
  
    @BelongsToMany(() => Post, () => PostHashtag)
    posts: Post[];
  }