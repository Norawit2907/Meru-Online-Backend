import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddonDto {

  @ApiProperty()
  wat_id: string;
    
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsString()
  @ApiProperty()
  image: string;

  @IsNumber()
  @ApiProperty()
  cost: number;

  @IsString()
  @ApiProperty()
  catalog: string;

  @IsString()
  @ApiProperty()
  description: string;

}
