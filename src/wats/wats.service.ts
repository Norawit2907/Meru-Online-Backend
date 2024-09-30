import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { max, min } from 'class-validator';
import mongoose, { Model } from 'mongoose';
import { Wat } from 'src/model/wat.model';
import { WatDocument, WatMongo } from 'src/server-adaptor-mongo/wat.schema.mongo';
import { CreateWatDto } from './dto/create-wat.dto';
import { UpdateWatDto } from './dto/update-wat.dto';

@Injectable()
export class WatsService {
    constructor(@InjectModel('WatMongo') private userModel: Model<WatMongo>) {}

    async createWat(createwatDto: CreateWatDto): Promise<Wat> {
        const newWat = new this.userModel(createwatDto);
        newWat.save();
        return this.toEntity(newWat);
      }
    async getWatById(id: string): Promise<Wat | null> {
       const existUser = await this.userModel.findOne({
       _id: new mongoose.Types.ObjectId(id),
       });
    
        return existUser ? this.toEntity(existUser) : null;
      }

    async updateWatById(
        id: string,
        updatewatDto: UpdateWatDto,
      ): Promise<Wat | null> {
        const updatedUser = await this.userModel.findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
          },
          updatewatDto,
          { new: true },
        );
    
        return updatedUser ? this.toEntity(updatedUser) : null;
      }
    async listWats(): Promise<Wat[]> {
        const allUser = await this.userModel.find({});
        return allUser.map((doc) => this.toEntity(doc));
      }  

    async deleteWatById(id: string): Promise<null> {
        await this.userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        return null;
      }
    
    toEntity(doc: WatDocument): Wat {
    return {
      id: doc._id.toHexString(),
      admin_id: doc.admin_id,
      name: doc.name,
      min_cost: doc.min_cost,
      max_cost: doc.max_cost,
      description: doc.description,
      location: doc.location,
      picture: doc.picture,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }
}
