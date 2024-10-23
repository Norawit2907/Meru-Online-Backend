import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from 'src/model/user.model';
import { CreateAddressDto } from './dto/create-addresses.dto';
import { AddressesService } from './addresses.service';
import { Address } from 'src/model/address.model';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAddressDto } from './dto/update-addresses.dto';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async createAddress(
    @Body() createaddressDto: CreateAddressDto,
  ): Promise<Address> {
    return await this.addressesService.createAddress(createaddressDto);
  }

  @Get()
  async listAddresses(): Promise<Address[]> {
    return await this.addressesService.listAddresses();
  }

  @Get('/wat/:id')
  async getAddressByWatId(
    @Param('id') id: string
  ): Promise<Address>{
    return await this.addressesService.getAddressByWatId(id);
  }

  @Put('/wat/:id')
  async updateAddressByWatId(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    
    const Address = await this.addressesService.updateAddressByWatId(
        id,
        updateAddressDto
    )
    if(!Address){
        throw new NotFoundException('Address not found!');
    }
    return Address;
  }

  @Put('id/:id')
  async updateAddressById(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const Address = await this.addressesService.updateAddressById(
      id,
      updateAddressDto,
    );
    if (!Address) {
      throw new NotFoundException('Address not found!');
    }
    return Address;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAddressById(@Param('id') id: string) {
    const address = await this.addressesService.getAddressById(id);
    if (!address) {
      throw new NotFoundException('Address not found!');
    }
    await this.addressesService.deleteAddressById(id);
    return { message: 'Address Deleted Successfully' };
  }
}
