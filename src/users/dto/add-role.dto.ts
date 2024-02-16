import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN',  description: 'Role value'})
  @IsString({ message: 'Must be string' })
  readonly value: string;

  @ApiProperty({ example: '1',  description: 'User ID'})
  @IsNumber({}, { message: 'Must be number' })
  readonly userId: number;
}