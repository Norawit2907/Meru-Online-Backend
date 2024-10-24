import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { max, min } from 'class-validator';
import mongoose, { Model } from 'mongoose';
import { Address } from 'src/model/address.model';
import { AddressDocument, AddressMongo } from 'src/server-adaptor-mongo/address.schema.mongo';
import { CreateAddressDto } from './dto/create-addresses.dto';
import { UpdateAddressDto } from './dto/update-addresses.dto';
import { GeocodingService } from 'src/geocoding/geocoding.service';

@Injectable()
export class AddressesService {
  constructor(@InjectModel('AddressMongo') private addressModel: Model<AddressMongo>,
    private readonly geocodingService: GeocodingService
  ) { }

  async createAddress(createaddressDto: CreateAddressDto): Promise<Address> {

    // if(this.getAddressByWatId(createaddressDto.wat_id)){
    //   throw new NotFoundException("Address already exist")
    // }

    const address_lat_lng = await this.geocodingService.getCoordinates(createaddressDto.address);

    const newAddress = new this.addressModel(
      {
        ...createaddressDto,
        latitude: address_lat_lng.lat,
        longtitude: address_lat_lng.lng,
      }
    );
    newAddress.save();
    return this.toEntity(newAddress);
  }

  async getAddressById(id: string): Promise<Address | null> {
    const existUser = await this.addressModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    return existUser ? this.toEntity(existUser) : null;
  }

  async getAddressByWatId(id: string): Promise<Address | null> {
    const existAddress = await this.addressModel.findOne({
      wat_id: id
    });
    return existAddress ? this.toEntity(existAddress) : null
  }

  async updateAddressByWatId(wat_id: string, updateAddressDto: UpdateAddressDto): Promise<Address | null> {
    const existAddress = await this.getAddressByWatId(wat_id);
    const address_lat_lng = await this.geocodingService.getCoordinates(updateAddressDto.address);
    if (!existAddress) {
      throw new NotFoundException("Address not found")
    }
    
    const updatedAddress = await this.addressModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(existAddress.id)
      },
      updateAddressDto,
      
      { new: true },
    )
    return updatedAddress ? this.toEntity(updatedAddress) : null
  }

  async updateAddressById(
    id: string,
    updateaddressDto: UpdateAddressDto,
  ): Promise<Address | null> {
    
    const updatedUser = await this.addressModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      updateaddressDto,
      { new: true },
    );

    return updatedUser ? this.toEntity(updatedUser) : null;
  }
  async listAddresses(): Promise<Address[]> {
    const allUser = await this.addressModel.find({});
    return allUser.map((doc) => this.toEntity(doc));
  }

  async deleteAddressById(id: string): Promise<null> {
    await this.addressModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return null;
  }


  toEntity(doc: AddressDocument): Address {
    return {
      id: doc._id.toHexString(),
      wat_id: doc.wat_id,
      address: doc.address,
      street: doc.street,
      alley: doc.alley,
      province: doc.province,
      distrinct: doc.distrinct,
      sub_distrinct: doc.sub_distrinct,
      postalCode: doc.postalCode,
      latitude: doc.latitude,
      longtitude: doc.longtitude,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

}
