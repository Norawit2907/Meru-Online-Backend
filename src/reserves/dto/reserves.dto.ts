import { 
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    IsArray, 
    IsDateString 
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class ReservesDto {
    @IsString()
    @ApiProperty({ example: 'WAT-123', description: 'Wat (temple) identifier' })
    wat_id: string;
  
    @IsString()
    @ApiProperty({ example: 'USER-456', description: 'User identifier who made the reservation' })
    user_id: string;

    @IsString()
    @ApiProperty({ example: 'wat', description: 'User identifier who made the reservation' })
    sender: string;
  
    @IsDateString()
    @ApiProperty({ example: '2024-10-18', description: 'Date of reservation in ISO format' })
    reservation_date: string;
  
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2024-10-20', description: 'Cremation date in ISO format' })
    cremation_date: string;
  
    @IsNotEmpty()
    @ApiProperty({ example: '3', description: 'Duration of the reservation' })
    duration: string;
  
    @IsNotEmpty()
    @ApiProperty({ example: 'pending', description: 'Status of the reservation' })
    status: string;
  
    @IsNumber()
    @ApiProperty({ example: 5000, description: 'Total price of the reservation' })
    price: number;
  
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: ['ชุดครบเซ็ต', 'ชุดไม่ครบเซ็ต'], description: 'List of addons for the reservation' })
    addons: string[];
  }
  