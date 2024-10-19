import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { max, min } from 'class-validator';
import mongoose, { Model } from 'mongoose';
import { Address } from 'src/model/address.model';
import { AddressDocument, AddressMongo } from 'src/server-adaptor-mongo/address.schema.mongo';
import { CreateAddressDto } from './dto/create-addresses.dto';
import { UpdateAddressDto } from './dto/update-addresses.dto';

@Injectable()
export class AddressesService {
    constructor(@InjectModel('AddressMongo') private addressModel: Model<AddressMongo>) {}

    async createAddress(createaddressDto: CreateAddressDto): Promise<Address> {
        const newAddress = new this.addressModel(createaddressDto);
        newAddress.save();
        return this.toEntity(newAddress);
      }

    async getAddressById(id: string): Promise<Address | null> {
       const existUser = await this.addressModel.findOne({
       _id: new mongoose.Types.ObjectId(id),
       });
    
        return existUser ? this.toEntity(existUser) : null;
      }

    async getAddressByWatId(id: string): Promise<Address | null>{
      const existAddress = await this.addressModel.findOne({
        wat_id: id
      });
      return existAddress ? this.toEntity(existAddress) : null
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
      disctrinct: doc.disctrinct,
      sub_disctrinct: doc.sub_disctrinct,
      postalCode: doc.postalCode,
      latitude: doc.latitude,
      longtitude: doc.longtitude,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

}
