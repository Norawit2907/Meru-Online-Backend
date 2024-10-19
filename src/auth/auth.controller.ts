import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/login')
  UserSignIn(@Body() body: signInDto) {
    return this.authService.userSignIn(body.email, body.password);
  }

  @Post('user/register')
  UserRegister(
    @Body() body: CreateUserDto) {
    return this.authService.userRegister(body);
  }

  @Post('wat/login')
  WatSignIn(@Body() body: signInDto){
    return this.authService.watSignIn(body.email, body.password)
  }

  @Post('wat/register')
  WatRegister(
    @Body() body: signInDto) {
    return this.authService.watRegister(body.email, body.password);
  }

}
