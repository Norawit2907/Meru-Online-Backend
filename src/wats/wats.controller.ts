import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common'; 
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
    async createWat(@Body() createwatDto: CreateWatDto): Promise<Wat> {
        return await this.watsService.createWat(createwatDto);
    }

    @Get()
    async listWats(): Promise<Wat[]> {
        return await this.watsService.listWats();
    }

    @Get(':id')
    async getWatsById(@Param('id') id: string): Promise<Wat> {
        const wat = await this.watsService.getWatById(id);
        if (!wat) {
          throw new NotFoundException('Wat not found!');
        }
        return wat;
      }
    
    @Get('search')
    async searchWats(@Query('keyword') keyword: string): Promise<Wat[]> {
        if (!keyword) {
            throw new NotFoundException('Keyword is required for search');
        }
        return await this.watsService.searchWats(keyword);
    }

    @Put(':id')
    async updateWatById(
        @Param('id') id: string,
        @Body() updateWatDto: UpdateWatDto,
    ): Promise<Wat> {
        const wat = await this.watsService.updateWatById(id, updateWatDto);
        if (!wat) {
            throw new NotFoundException('Wat not found!');
        }
        return wat;
    }

    @Delete(':id')
    @HttpCode(204) 
    async deleteWatById(@Param('id') id: string) {
        const wat = await this.watsService.getWatById(id);
        if (!wat) {
            throw new NotFoundException('Wat not found!');
        }
        await this.watsService.deleteWatById(id);
        return { message: 'Wat Deleted Successfully' };
    }


}
