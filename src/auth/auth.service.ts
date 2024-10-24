import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IsLatitude } from 'class-validator';
import { access } from 'fs';
import { AddressesService } from 'src/address/addresses.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { WatsService } from 'src/wats/wats.service';
import { WatuserService } from 'src/watuser/watuser.service';

@Injectable()
export class AuthService {
  constructor(
    private watService: WatsService,
    private addressService: AddressesService,
    private watuserService: WatuserService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async userSignIn(email: string, password: string) {
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
      sub: user.id,
      role: 'user',
      username: user.firstName + ' ' + user.lastName,
      user_img: user.profile_img,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userRegister(body: CreateUserDto) {
    const userexist = await this.usersService.getUserByEmail(body.email)
      if(userexist){
        throw new ForbiddenException("Email already taken")
      }
    const newUser = await this.usersService.createUser(body)
    const payload = {
      sub: newUser.id,
    }
    return {
      sub: newUser.id,
      username: newUser.firstName + ' ' + newUser.lastName,
      user_img: newUser.profile_img,
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async watSignIn(email: string, password: string){
    const watuser = await this.watuserService.getUserByEmail(email);
    if (!watuser) {
      throw new UnauthorizedException();
    }

    if (watuser.password !== password) {
      throw new UnauthorizedException();
    }

    const existwat = await this.watService.getWatByAdminId(watuser.id)
    
    if(!existwat){
      throw new NotFoundException("Wat not Found!!")
    }

    const payload = {
      sub: watuser.id,
    };
    return {
      sub: watuser.id,
      wat_id: existwat.id,
      role: "wat",
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async watRegister(email:string, password: string){
    const watExist = await this.watuserService.getUserByEmail(email)
      if(watExist){
        throw new ForbiddenException("Email already taken")
      }
    const newUser = await this.watuserService.createWatuser({email: email, password: password})
    const watpayload = {
      name: "default wat",
      admin_id: newUser.id,
      admin_name: "-",
      phoneNumber: "-",
      line_ID: "-",
      Facebook: "-",
      min_cost: 0,
      max_cost: 0,
      max_workload: 1,
      description: "description",
      location: "location",
      picture: []
    }

    const newWat = await this.watService.createWat(watpayload)
    if(!newWat){
      throw new BadRequestException("Can't create wat")
    }

    const addresspayload = {
      wat_id: newWat.id,
      wat_name: newWat.name,
      address: "-",
      street: "-",
      alley: "-",
      province: "-",
      distrinct: '-',
      sub_distrinct: "-",
      postalCode: "-",
      latitude: "-",
      longtitude: "-"
    }

    const newAddress = await this.addressService.createAddress(addresspayload)

    const payload = {
      sub: newUser.id,
    }
    return {
      sub: newUser.id,
      wat_id: newWat.id,
      role: 'wat',
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
