import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {

  @IsString()
  @ApiProperty()
  wat_id: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  alley: string;

  @IsString()
  @ApiProperty()
  province: string;

  @IsString()
  @ApiProperty()
  distrinct: string;

  @IsString()
  @ApiProperty()
  sub_distrinct: string;

  @IsString()
  @ApiProperty()
  postalCode: string;

  @IsString()
  @ApiProperty()
  latitude: string;

  @IsString()
  @ApiProperty()
  longtitude: string;
}
