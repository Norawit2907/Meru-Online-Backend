import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(body: CreateUserDto) {
    const userexist = await this.usersService.getUserByEmail(body.email)
      if(userexist){
        throw new ForbiddenException("Email already taken")
      }
    const newUser = await this.usersService.createUser(body)
    const payload = {
      sub: newUser.id,
    }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
