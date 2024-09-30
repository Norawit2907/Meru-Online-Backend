import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWatDto {
  
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
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

  @IsString()
  @ApiProperty()
  picture: string[];
}