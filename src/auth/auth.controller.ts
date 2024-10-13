import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    signIn(@Body() body: signInDto){
        return this.authService.signIn(body.email, body.password);
    }
    
    @Post('register')
    register(@Body() body: CreateUserDto){
        return this.authService.register(body);
    }
}
