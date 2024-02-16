import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.com',  description: 'User email'})
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'password',  description: 'User password'})
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Must be from 4 to 16 symbols' })
  readonly password: string;
}