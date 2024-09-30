import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWatDto {
  @IsString()
  @ApiProperty()
  id: string;

  @ApiProperty()
  admin_id: string[];

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  min_cost: number;

  @IsNumber()
  @ApiProperty()
  max_cost: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  location: string;

  @ApiProperty()
  picture: string[];
}
