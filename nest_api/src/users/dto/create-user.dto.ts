import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'admin@admin.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
  })
  password: string;
}
