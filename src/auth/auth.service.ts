import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<any>{
    const user = await this.usersService.getUserByEmail(email);
    if(!user){
        throw new UnauthorizedException();
    }
    if(user.password !== password){
        throw new UnauthorizedException();
    }

    return user
  }
}
