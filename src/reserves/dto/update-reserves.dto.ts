import { 
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    IsArray, 
    IsDateString 
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UpdateReservesDto {
  
    @IsNotEmpty()
    @ApiProperty({ example: 'pending', description: 'Status of the reservation' })
    status: string;
  
    @IsString()
    @ApiProperty({ example: 'user', description: 'User identifier who made the reservation' })
    sender: string;

  }
  