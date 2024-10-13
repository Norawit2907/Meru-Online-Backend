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
} from '@nestjs/common';
import { WatuserService } from './watuser.service';
import { CreateWatuserDto } from './dto/create-watuser.dto';
import { UpdateWatuserDto } from './dto/update-watuser.dto';
import { Watuser } from 'src/model/watuser.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('watuser')
@Controller('watuser')
export class WatuserController {
  constructor(private readonly watuserService: WatuserService) {}

  @Post()
  async createWatuser(
    @Body() createWatuserDto: CreateWatuserDto,
  ): Promise<Watuser> {
    return await this.watuserService.createWatuser(createWatuserDto);
  }

  @Get()
  async listWatuser(): Promise<Watuser[]> {
    return await this.watuserService.listWatuser();
  }

  @Get(':id')
  async getWatuserById(@Param() id: string): Promise<Watuser> {
    const watuser = await this.watuserService.getWatuserById(id);
    if (!watuser) {
      throw new NotFoundException('User not found!');
    }
    return watuser;
  }

  @Put(':id')
  async updateWatuserById(
    @Param('id') id: string,
    @Body() updateWatuserDto: UpdateWatuserDto,
  ): Promise<Watuser> {
    const watuser = await this.watuserService.updateWatuserById(
      id,
      updateWatuserDto,
    );
    if (!watuser) {
      throw new NotFoundException('User not found!');
    }
    return watuser;
  }

  @Delete(':id')
  @HttpCode(204) // delete code
  async deleteWatuserById(@Param('id') id: string) {
    // check if your exist before delete
    const watuser = await this.watuserService.getWatuserById(id);
    if (!watuser) {
      throw new NotFoundException('User not found!');
    }
    await this.watuserService.deleteWatuserById(id);

    return { message: 'User Deleted Sucessfully' };
  }
}
