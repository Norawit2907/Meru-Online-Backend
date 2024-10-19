import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWatDto {
  
  @IsString()
  @ApiProperty()
  admin_id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  max_workload: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @ApiProperty()
  picture: string[];
}