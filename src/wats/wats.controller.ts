import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/model/user.model';
import { CreateWatDto } from './dto/create-wat.dto';
import { WatsService } from './wats.service';
import { Wat } from 'src/model/wat.model';
import { ApiTags } from '@nestjs/swagger';
import { UpdateWatDto } from './dto/update-wat.dto';

@ApiTags('wats')
@Controller('wats')
export class WatsController {
    constructor(private readonly watsService: WatsService) {}

  @Post()
  async createUser(@Body() createwatDto: CreateWatDto): Promise<Wat> {
    return await this.watsService.createWat(createwatDto);
  }

  @Get()
  async listWat(): Promise<Wat[]> {
    return await this.watsService.listWats();
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateWatDto,
  ): Promise<Wat> {
    const user = await this.watsService.updateWatById(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204) 
  async deleteWatById(@Param('id') id: string) {
    const user = await this.watsService.getWatById(id);
    if (!user) {
      throw new NotFoundException('Wat not found!');
    }
    await this.watsService.deleteWatById(id);

    return { message: 'User Deleted Sucessfully' };
  }
  
}
