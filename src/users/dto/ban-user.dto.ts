import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({ example: 'Spam',  description: 'Ban Reason'})
  readonly banReason: string;

  @ApiProperty({ example: '1',  description: 'User ID'})
  readonly userId: number;
}