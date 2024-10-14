import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common'; 
import { Wat } from 'src/model/wat.model';
import { CreateAddonDto } from './dto/create-addons.dto';
import { UpdateAddonDto } from './dto/update-addons.dto';
import { AddonsService } from './addons.service';
import { Addon } from 'src/model/addon.model';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('addons')
@Controller('addons')
export class AddonsController {
    constructor(private readonly addonsService: AddonsService) {}

    @Post()
    async createAddon(@Body() createAddonDto: CreateAddonDto): Promise<Addon> {
        return await this.addonsService.createAddon(createAddonDto);
    }

    @Get()
    async listAddons(): Promise<Addon[]> {
        return await this.addonsService.listAddons();
    }

    @Put(':id')
    async updateAddonById(
        @Param('id') id: string,
        @Body() updateAddonDto: UpdateAddonDto,
    ): Promise<Addon> {
        const addon = await this.addonsService.updateAddonById(id, updateAddonDto);
        if (!addon) {
            throw new NotFoundException('Addon not found!');
        }
        return addon;
    }

    @Delete(':id')
    @HttpCode(204) 
    async deleteWatById(@Param('id') id: string) {
        const wat = await this.addonsService.getAddonById(id);
        if (!wat) {
            throw new NotFoundException('Addon not found!');
        }
        await this.addonsService.deleteAddonById(id);
        return { message: 'Addon Deleted Successfully' };
    }


}
