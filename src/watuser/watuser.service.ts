import { Injectable } from '@nestjs/common';
import { CreateWatuserDto } from './dto/create-watuser.dto';
import { UpdateWatuserDto } from './dto/update-watuser.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  WatuserMongo,
  WatuserDocument,
} from 'src/server-adaptor-mongo/watuser.schema.mongo';
import mongoose, { Model } from 'mongoose';
import { Watuser } from 'src/model/watuser.model';

@Injectable()
export class WatuserService {
  constructor(
    @InjectModel('WatuserMongo') private watuserModel: Model<WatuserMongo>,
  ) {}

  async createWatuser(createWatuserDto: CreateWatuserDto): Promise<Watuser> {
    const newWatuser = new this.watuserModel(createWatuserDto);
    newWatuser.save();
    return this.toEntity(newWatuser);
  }

  async getWatuserById(id: string): Promise<Watuser | null> {
    const existWatuser = await this.watuserModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    return existWatuser ? this.toEntity(existWatuser) : null;
  }

  async listWatuser(): Promise<Watuser[]> {
    const allWatuser = await this.watuserModel.find({});
    return allWatuser.map((doc) => this.toEntity(doc));
  }

  async updateWatuserById(
    id: string,
    updateWatuserDto: UpdateWatuserDto,
  ): Promise<Watuser | null> {
    const updatedWatuser = await this.watuserModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      updateWatuserDto,
      { new: true },
    );

    return updatedWatuser ? this.toEntity(updatedWatuser) : null;
  }

  async deleteWatuserById(id: string): Promise<null> {
    await this.watuserModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return null;
  }

  toEntity(doc: WatuserDocument): Watuser {
    return {
      id: doc._id.toHexString(),
      username: doc.firstname,
      password: doc.password,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }
}
