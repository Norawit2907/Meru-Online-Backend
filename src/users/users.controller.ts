import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/model/user.model';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('bearer')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @UploadedFile() profile_img: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async listUser(): Promise<User[]> {
    return await this.usersService.listUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  // @UseGuards(AuthGuard)
  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersService.updateUserById(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204) // delete code
  async deleteUserById(@Param('id') id: string) {
    // check if your exist before delete
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    await this.usersService.deleteUserById(id);

    return { message: 'User Deleted Sucessfully' };
  }
}
