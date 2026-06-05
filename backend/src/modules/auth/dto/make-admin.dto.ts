import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class MakeAdminDto {
  @ApiProperty({ example: 'you@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Must match ADMIN_SETUP_SECRET on the server' })
  @IsString()
  @MinLength(8)
  secret: string;
}
