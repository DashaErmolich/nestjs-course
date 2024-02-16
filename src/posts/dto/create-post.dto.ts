import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: 'My title',  description: 'Post title'})
  readonly title: string;

  @ApiProperty({ example: 'My content',  description: 'Post content'})
  readonly content: string;

  @ApiProperty({ example: 6,  description: 'Creator Id'})
  readonly userId: number
}