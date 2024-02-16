import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from 'src/users/users.model';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({
  tableName: 'posts',
})
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1',  description: 'Unique ID'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'My title',  description: 'Post title'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'My content',  description: 'Post content'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  content: string;

  @ApiProperty({ example: 'My image',  description: 'Post image'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  image: string;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;
}