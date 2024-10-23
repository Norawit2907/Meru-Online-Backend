import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWatDto {
  
  @ApiProperty()
  admin_id: string;

  @ApiProperty()
  admin_name: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  line_ID: string;

  @IsString()
  @ApiProperty()
  Facebook: string;

  @IsNumber()
  @ApiProperty()
  min_cost: number;

  @IsNumber()
  @ApiProperty()
  max_cost: number;

  @IsNumber()
  @ApiProperty()
  max_workload: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  location: string;

  @ApiProperty()
  picture: string[];
}
