import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddonDto {
  
    @IsString()
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    wat_id: string;
    
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