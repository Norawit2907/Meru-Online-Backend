import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
